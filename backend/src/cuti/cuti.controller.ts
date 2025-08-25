import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CutiService } from './cuti.service';
import { CreateCutiDto } from './dto/create-cuti.dto';
import { UpdateCutiDto } from './dto/update-cuti.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('cuti')
export class CutiController {
  constructor(private readonly cutiService: CutiService) {}

  @Get()
  findAll() {
    return this.cutiService.findAll();
  }

  @Post()
  create(@Body() dto: CreateCutiDto) {
    return this.cutiService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCutiDto) {
    return this.cutiService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cutiService.delete(Number(id));
  }
}
