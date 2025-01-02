import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Feedback } from '../../feedback/entities/feedback.entity';

@Entity('users')
export  class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  termsAccepted: boolean;

  @OneToMany(() => Feedback, feedback => feedback.user)
  feedback: Feedback[];
}