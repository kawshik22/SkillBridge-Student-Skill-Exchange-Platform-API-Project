import {
  Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req,
} from '@nestjs/common';

import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('skills')
export class SkillsController {
  constructor(
    private skillsService: SkillsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
   create(
    @Body() data: CreateSkillDto,
    @Req() req,
  ) 
  
  {

  if (
    req.user.role !== 'mentor'
  ) {
    return {
      message:
        'Only mentor can create skills',
    };
  }

  data['createdBy'] = req.user.id;

  return this.skillsService.create(data);}

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: CreateSkillDto,
  ) {
    return this.skillsService.update(
      id,
      data,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.skillsService.remove(id);
  }
}