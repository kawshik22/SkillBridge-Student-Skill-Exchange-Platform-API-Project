import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestsController } from './requests.controller';

import { RequestsService } from './requests.service';

import { Request } from './request.entity';

import { User } from '../users/user.entity';

import { Skill } from '../skills/skill.entity';

@Module({
  imports: [

    TypeOrmModule.forFeature([
      Request,
      User,
      Skill,
    ]),
  ],

  controllers: [
    RequestsController,
  ],

  providers: [
    RequestsService,
  ],

  exports: [
    RequestsService,
  ],
})

export class RequestsModule {}