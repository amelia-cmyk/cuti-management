import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PegawaiService } from './pegawai.service';
import { Pegawai } from './pegawai.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('pegawai')
export class PegawaiController {
  constructor(private readonly pegawaiService: PegawaiService) {}

  @Get()
  findAll(): Promise<Pegawai[]> {
    return this.pegawaiService.findAll();
  }

  @Get('with-cuti')
  findAllWithCuti() {
    return this.pegawaiService.findAllWithCuti();
  }

  @Post()
  create(@Body() body: Partial<Pegawai>) {
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
