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
    return await this.entityManager.transaction(async (manager) => {
      const account = await this.accountRepository.getBalance(
        accountId,
        manager,
      );
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
      return accountDTO;
    });
  }

  async makeTransaction(
    accountId: number,
    originAccount: number,
    mount: number,
  ): Promise<{ success: boolean; message: string }> {
    return await this.entityManager.transaction(async (manager) => {
      await this.accountRepository.makeTransaction(
        accountId,
        originAccount,
        mount,
        manager,
      );

      await this.simulateExternalSystem(accountId, originAccount, mount);
      return {
        success: true,
        message: 'Transaction completed successfully',
      };
    });
  }
  private async simulateExternalSystem(
    accountId: number,
    originAccount: number,
    mount: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 5000 + 100;
      setTimeout(() => {
        const failChance = Math.random();
        if (failChance < 0.05) {
          reject(
            new Error(
              `External system failed for transaction ${accountId} -> ${originAccount} of ${mount}`,
            ),
          );
        } else {
          resolve();
        }
      }, delay);
    });
  }
}
