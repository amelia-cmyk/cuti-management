import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CutiService } from './cuti.service';

@Controller('cuti')
export class CutiController {
  constructor(private readonly cutiService: CutiService) {}

  @Get()
  findAll() {
    return this.cutiService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.cutiService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.cutiService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cutiService.delete(id);
  }
}
