import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Company } from '../../entities/company/company.entity';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' }) 
  company: Company;

  @Column({ type: 'float', nullable: true })
  debit: number;

  @Column({ type: 'float', nullable: true })
  credit: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}