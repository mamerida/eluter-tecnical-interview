import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';


@Entity({ name: 'account_balances' })
export class AccountBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.balances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' }) 
  account: Account;

  @Column({ type: 'float', nullable: true })
  debit: number;

  @Column({ type: 'float', nullable: true })
  credit: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
