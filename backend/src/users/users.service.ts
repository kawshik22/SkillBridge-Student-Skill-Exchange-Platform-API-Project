import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // GET ALL USERS
  findAll() {

    return this.userRepo.find();
  }

  // GET ONLY PENDING USERS
  findPendingUsers() {

    return this.userRepo.find({
      where: {
        status: 'pending',
      },
    });
  }

  // APPROVE USER
  async approveUser(
  id: number,
) {

  const user =
    await this.userRepo.findOne({
      where: { id },
    });

  if (!user) {

    return {
      message:
        'User not found',
    };
  }

  user.status =
    'approved';

  await this.userRepo.save(
    user,
  );

  return {
    message:
      'User Approved',
  };
}
}