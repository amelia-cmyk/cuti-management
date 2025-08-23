import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pegawai } from './pegawai.entity';
import { PegawaiService } from './pegawai.service';
import { PegawaiController } from './pegawai.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pegawai])], // ini penting!
  controllers: [PegawaiController],
  providers: [PegawaiService],
})
export class PegawaiModule {}
