import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  level!: string;

  @Column({
    nullable: true,
  })
  phone!: string;

  @ManyToOne(() => User)
  createdBy!: User;
}