import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuti } from './cuti.entity';
import { Pegawai } from '../pegawai/pegawai.entity';
import { CutiService } from './cuti.service';
import { CutiController } from './cuti.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cuti, Pegawai])],
  providers: [CutiService],
  controllers: [CutiController],
})
export class CutiModule {}
