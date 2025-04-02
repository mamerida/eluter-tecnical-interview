import { Company } from 'src/entities/company/company.entity';
import { Account } from 'src/entities/accounts/account.entity';
import { AppDataSource } from '../dataSource';
import { AccountBalance } from 'src/entities/accountBalance/accountBalance.entity';

async function seedDatabase() {
  await AppDataSource.initialize();
  console.log('Conectado a la base de datos. Insertando datos...');

  const companyRepo = AppDataSource.getRepository(Company);
  const accountRepo = AppDataSource.getRepository(Account);
  const balanceRepo = AppDataSource.getRepository(AccountBalance);

  const company1 = companyRepo.create({
    company_name: 'Empresa Alpha',
    society: 'SA',
    cuit: 12345678901,
    password: 'password123',
    created_at: new Date(),
  });

  const company2 = companyRepo.create({
    company_name: 'Empresa Beta',
    society: 'SRL',
    cuit: 98765432101,
    password: 'password456',
    created_at: new Date(),
  });

  await companyRepo.save([company1, company2]);

  const account1 = accountRepo.create({
    company: company1,
    created_at: new Date(),
  });

  const account2 = accountRepo.create({
    company: company2,
    created_at: new Date(),
  });

  await accountRepo.save([account1, account2]);

  const balanceCompany1Debit = balanceRepo.create({
    account:account1,
    debit:300,
    created_at: new Date()
  });
  const balance2Company1Credit = balanceRepo.create({
    account:account1,
    credit:100,
    created_at: new Date()
  });

  const balanceCompany2Debit = balanceRepo.create({
    account:account2,
    debit:400,
    created_at: new Date()
  });
  const balance2Company2Credit = balanceRepo.create({
    account:account2,
    credit:100,
    created_at: new Date()
  });

  await balanceRepo.save([balanceCompany1Debit, balance2Company1Credit, balanceCompany2Debit, balance2Company2Credit]);

  console.log('success');
  await AppDataSource.destroy(); 
}

seedDatabase().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});