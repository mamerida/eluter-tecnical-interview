import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';


@Entity({ name: 'account_balances' })
export class AccountBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.balances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' }) 
  account: Account;

  @Column({ type: 'float', nullable: true })
  debit: number;

  @Column({ type: 'float', nullable: true })
  credit: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
