import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
 Post,
} from '@nestjs/common';

import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {

  constructor(
    private readonly requestsService: RequestsService,
  ) {}

  // CREATE REQUEST
  @Post()
  async create(
    @Body() body: any,
  ) {

    return await this.requestsService.create(
      body,
      body.userId,
    );
  }

  // GET ALL REQUESTS
  @Get()
  async findAll() {

    return await this.requestsService.findAll();
  }

  // UPDATE STATUS
  @Patch(':id')
  async updateStatus(

    @Param('id')
    id: string,

    @Body('status')
    status: string,
  ) {

    return await this.requestsService.updateStatus(
      Number(id),
      status,
    );
  }
}