import {
  Controller,
  Post,
 Get,
  Body,
  UseGuards,
} from '@nestjs/common';

import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sessions')
@ApiBearerAuth('access-token')
@Controller('sessions')
export class SessionsController {
  constructor(
    private sessionsService: SessionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateSessionDto,) {
    return this.sessionsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }
}