import {
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('approve/:id')
async approveUser(
  @Param('id') id: number,
) {

  return this.usersService.approveUser(
    Number(id),
  );
}
}