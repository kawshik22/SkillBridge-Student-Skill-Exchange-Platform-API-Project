import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { Request } from './request.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';

@Injectable()
export class RequestsService {

  constructor(

    @InjectRepository(Request)
    private requestRepo:
      Repository<Request>,

    @InjectRepository(User)
    private userRepo:
      Repository<User>,

    @InjectRepository(Skill)
    private skillRepo:
      Repository<Skill>,
  ) {}

  // CREATE REQUEST
  async create(
    body: any,
    userId: any,
  ) {

    const learner =
      await this.userRepo.findOne({
        where: {
          id: Number(userId),
        },
      });

    const skill =
      await this.skillRepo.findOne({
        where: {
          id: body.skill,
        },

        relations: [
          'createdBy',
        ],
      });

    const request =
      this.requestRepo.create({

        message:
          body.message,

        phone:
          body.phone,

        learner,

        skill,
      } as any);

    return this.requestRepo.save(
      request,
    );
  }

  // GET ALL REQUESTS
  findAll() {

  return this.requestRepo.find({

    relations: [
      'learner',
      'skill',
      'skill.createdBy',
    ],

  });
}

  // UPDATE REQUEST STATUS
  async updateStatus(
    id: number,
    status: string,
  ) {

    await this.requestRepo.update(
      id,
      {
        status,
      },
    );

    return {
      message:
        'Request Updated',
    };
  }
}