import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  topic!: string;

  @Column()
  date!: string;

  @Column()
  mentorId!: number;

  @Column()
  learnerId!: number;
}