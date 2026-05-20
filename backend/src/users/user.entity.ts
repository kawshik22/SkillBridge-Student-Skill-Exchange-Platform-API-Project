import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Skill } from '../skills/skill.entity';

import { Request } from '../requests/request.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @Column({
    default: 'pending',
  })
  status!: string;

  // Mentor Skills
  @OneToMany(
    () => Skill,
    (skill) => skill.createdBy,
  )
  skills!: Skill[];

  // Student Requests
  @OneToMany(
    () => Request,
    (request) => request.learner,
  )
  requests!: Request[];
}