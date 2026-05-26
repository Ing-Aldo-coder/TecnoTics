import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: string;

  @Column()
  customerName: string;

  @Column('decimal')
  totalAmount: number;

  @Column({ default: 'Pendiente' })
  paymentStatus: string;

  @CreateDateColumn()
  createdAt: Date;
}
