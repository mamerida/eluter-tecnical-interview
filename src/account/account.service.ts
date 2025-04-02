import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { EntityManager } from 'typeorm';
import { AccountBalance } from './utils/accountTipes';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async getBalance(accountId: number): Promise<AccountBalance> {
    const account = await this.accountRepository.getBalance(accountId);
    const total_debit = account.balances.reduce(
      (sum, b) => sum + (b.debit || 0),
      0,
    );
    const total_credit = account.balances.reduce(
      (sum, b) => sum + (b.credit || 0),
      0,
    );
    const accountDTO: AccountBalance = {
      id: account.id,
      companyName: account.company.company_name,
      companySociety: account.company.society,
      debit: total_debit,
      credit: total_credit,
      total: total_debit - total_credit,
    };
    console.log('account', accountDTO);
    return accountDTO;
  }
}
