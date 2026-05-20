import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  topic!: string;

  @IsNotEmpty()
  date!: string;

  @IsNotEmpty()
  mentorId!: number;

  @IsNotEmpty()
  learnerId!: number;
}