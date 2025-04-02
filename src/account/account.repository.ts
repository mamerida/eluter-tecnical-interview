import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async getBalance(accountId: number): Promise<Account> {
    const account = await this.repository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.company', 'company')
      .leftJoinAndSelect(
        'account.balances',
        'balances',
        'balances.deleted_at IS NULL',
      )
      .where('account.id = :accountId', { accountId })
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
