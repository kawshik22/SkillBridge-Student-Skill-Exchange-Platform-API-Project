import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

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
    userId: number,
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
          id: Number(body.skill),
        },

        relations: [
          'createdBy',
        ],
      });

    if (!learner || !skill) {

      return {
        message:
          'Learner or Skill not found',
      };
    }

    // CHECK ALREADY REQUESTED
    const existingRequest =
      await this.requestRepo.findOne({

        where: {

          learner: {
            id: learner.id,
          },

          skill: {
            id: skill.id,
          },
        },

        relations: [
          'learner',
          'skill',
        ],
      });

    if (existingRequest) {

      return {
        message:
          'Request already sent',
      };
    }

    const request =
      this.requestRepo.create({

        message:
          body.message,

        phone:
          body.phone,

        status:
          'pending',

        learner,

        skill,
      } as any);

    return this.requestRepo.save(
      request,
    );
  }

  // GET ALL REQUESTS
  async findAll() {

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

    const request =
      await this.requestRepo.findOne({

        where: {
          id,
        },

        relations: [

          'learner',

          'skill',

          'skill.createdBy',
        ],
      });

    if (!request) {

      return {
        message:
          'Request not found',
      };
    }

    request.status = status;

    await this.requestRepo.save(
      request,
    );

    return {

      message:
        'Request updated successfully',

      request,
    };
  }
}