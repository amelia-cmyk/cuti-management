import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PegawaiService } from './pegawai.service';
import { Pegawai } from './pegawai.entity';

@Controller('pegawai')
export class PegawaiController {
  constructor(private readonly pegawaiService: PegawaiService) {}

  @Get()
  findAll(): Promise<Pegawai[]> {
    return this.pegawaiService.findAll();
  }

  // @Post()
  // create(@Body() data: Partial<Pegawai>) {
  //   return this.pegawaiService.create(data);
  // }
  @Post()
  create(@Body() body) {
    return this.pegawaiService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Pegawai>) {
    return this.pegawaiService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.pegawaiService.delete(id);
  }
}
