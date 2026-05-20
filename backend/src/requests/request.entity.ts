import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { User } from '../users/user.entity';

import { Skill } from '../skills/skill.entity';

@Entity()
export class Request {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column({
    default: 'pending',
  })
  status!: string;

  @Column({
    nullable: true,
  })
  phone!: string;

  @ManyToOne(
    () => User,
    (user) => user.requests,
    {
      eager: true,
    },
  )
  learner!: User;

  @ManyToOne(
    () => Skill,
    {
      eager: true,
    },
  )
  skill!: Skill;
}