import {
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Controller('admin')
export class AdminController {

  constructor(
    private usersService: UsersService,
  ) {}

  // GET PENDING USERS
  @Get('pending-users')
  getPendingUsers() {

    return this.usersService.findPendingUsers();
  }

  // APPROVE USER
  @Patch('approve/:id')
  approveUser(
    @Param('id') id: number,
  ) {

    return this.usersService.approveUser(
      Number(id),
    );
  }
}