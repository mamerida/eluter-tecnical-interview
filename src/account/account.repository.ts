import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/accounts/account.entity';
import { AccountBalance } from 'src/entities/accountBalance/accountBalance.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getBalance(
    accountId: number,
    manager: EntityManager,
  ): Promise<Account> {
    const account = await manager
      .createQueryBuilder(Account, 'account')
      .innerJoinAndSelect('account.company', 'company')
      .innerJoinAndSelect(
        'account.balances',
        'balances',
        'balances.deleted_at IS NULL',
      )
      .where('account.id = :accountId', { accountId })
      .setLock('pessimistic_read')
      .getOne();
    if (
      !account ||
      account.deleted_at !== null ||
      account?.company?.deleted_at !== null
    )
      throw new BadRequestException(
        `the account ID ${accountId} does not exist or has been closed `,
      );
    return account;
  }

  async makeTransaction(
    accountId: number,
    originAccount: number,
    mount: number,
    manager: EntityManager,
  ): Promise<any> {
    const accounts = await manager
      .createQueryBuilder(Account, 'account')
      .innerJoinAndSelect('account.company', 'company')
      .innerJoinAndSelect(
        'account.balances',
        'balances',
        'balances.deleted_at IS NULL',
      )
      .where('account.id IN (:...ids)', { ids: [accountId, originAccount] })
      .setLock('pessimistic_write')
      .getMany();

    const account = accounts.find((a) => a.id === accountId);
    const origin = accounts.find((a) => a.id === originAccount);

    [account, origin].forEach((acc) => {
      if (!acc || acc.deleted_at || acc.company.deleted_at) {
        throw new BadRequestException(
          `The account ID ${acc?.id} does not exist or has been closed`,
        );
      }
    });

    const total_debit = origin!.balances.reduce(
      (sum, b) => sum + (b.debit || 0),
      0,
    );
    const total_credit = origin!.balances.reduce(
      (sum, b) => sum + (b.credit || 0),
      0,
    );

    if (total_debit - total_credit <= mount) {
      throw new BadRequestException(
        `Insufficient funds in account ID ${originAccount}`,
      );
    }

    const debitEntry = new AccountBalance();
    debitEntry.account = { id: accountId } as Account;
    debitEntry.debit = mount;
    debitEntry.created_at = new Date();

    const creditEntry = new AccountBalance();
    creditEntry.account = { id: originAccount } as Account;
    creditEntry.credit = mount;
    creditEntry.created_at = new Date();

    await manager.save(AccountBalance, [debitEntry, creditEntry]);
    return {};
  }
}
