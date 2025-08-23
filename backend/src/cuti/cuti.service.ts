import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuti } from './cuti.entity';
import { Pegawai } from '../pegawai/pegawai.entity';

@Injectable()
export class CutiService {
  constructor(
    @InjectRepository(Cuti) private cutiRepo: Repository<Cuti>,
    @InjectRepository(Pegawai) private pegawaiRepo: Repository<Pegawai>,
  ) {}

  findAll() {
    return this.cutiRepo.find({ relations: ['pegawai'] });
  }

  async create(data: any) {
    const pegawai = await this.pegawaiRepo.findOne({ where: { id: data.pegawai } });
    if (!pegawai) throw new Error('Pegawai tidak ditemukan');

    const cuti = this.cutiRepo.create({ ...data, pegawai });
    return this.cutiRepo.save(cuti);
  }

  update(id: number, data: Partial<Cuti>) {
    return this.cutiRepo.update(id, data);
  }

  delete(id: number) {
    return this.cutiRepo.delete(id);
  }
}
