import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Company } from '../../entities/company/company.entity';
import { AccountBalance } from '../accountBalance/accountBalance.entity';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' }) 
  company: Company;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => AccountBalance, (accountBalance) => accountBalance.account, { cascade: true })
  balances: AccountBalance[];
}