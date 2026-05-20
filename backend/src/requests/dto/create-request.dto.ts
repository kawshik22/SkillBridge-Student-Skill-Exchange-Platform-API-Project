import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsNumber()
  skill!: number;
}