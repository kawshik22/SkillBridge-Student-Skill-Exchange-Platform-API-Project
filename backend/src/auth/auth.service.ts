import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../users/user.entity';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(User)
    private userRepo:
      Repository<User>,

    private jwtService:
      JwtService,
  ) {}

  // REGISTER
  async register(
    data: RegisterDto,
  ) {

    const existingUser =
      await this.userRepo.findOneBy({
        email: data.email.toLowerCase(),
      });

    if (existingUser) {

      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10,
      );

    const user =
  this.userRepo.create({

    ...data,

    email:
      data.email.toLowerCase(),

    password:
      hashedPassword,
});

    await this.userRepo.save(
      user,
    );

    return {
      message:
        'Registration successful',
    };
  }

  // LOGIN
  async login(
    data: LoginDto,
  ) {

    const existinguser =
      await this.userRepo.findOneBy({
        email: data.email.toLowerCase(),
      });

    if (!existinguser) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isMatch =
      await bcrypt.compare(
        data.password,
        existinguser.password,
      );

    if (!isMatch) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    if (
      existinguser.status !==
      'approved'
    ) {

      return {
        message:
          'Account pending admin approval',
      };
    }

    const token =
      this.jwtService.sign({

        id: existinguser.id,

        email:
          existinguser.email,

        role:
          existinguser.role,

        status:
          existinguser.status,
      });

    return {

      access_token:
        token,

      user: {

        id: existinguser.id,

        fullName:
          existinguser.fullName,

        role:
          existinguser.role,

        status:
          existinguser.status,
      },
    };
  }

  // FORGOT PASSWORD
  async forgotPassword(
    body: any,
  ) {

    const existinguser =
      await this.userRepo.findOneBy({
        email: body.email.toLowerCase(),
      });

    if (!existinguser) {

      return {
        message:
          'User not found',
      };
    }

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10,
      );

    existinguser.password =
      hashedPassword;

    await this.userRepo.save(
      existinguser,
    );

    return {
      message:
        'Password Updated',
    };
  }
}