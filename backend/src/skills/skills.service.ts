import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Skill } from './skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  create(data: any) {
    return this.skillRepo.save(data);
  }

  

  findAll() {
    return this.skillRepo.find({
      relations: ['createdBy'],
    });
  }

  findOne(id: number) {
    return this.skillRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });
  }

  async update(id: number, data: any) {
    await this.skillRepo.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.skillRepo.delete(id);

    return {
      message: 'Skill deleted',
    };
  }
}