import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
  ) {}

  create(data: any) {
    return this.sessionRepo.save(data);
  }

  findAll() {
    return this.sessionRepo.find();
  }
}