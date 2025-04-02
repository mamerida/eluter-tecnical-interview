import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/accounts/account.entity';

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
}
