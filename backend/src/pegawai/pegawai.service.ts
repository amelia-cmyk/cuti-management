import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pegawai } from './pegawai.entity';

@Injectable()
export class PegawaiService {
  constructor(
    @InjectRepository(Pegawai)
    private pegawaiRepo: Repository<Pegawai>,
  ) {}

  findAll() {
    return this.pegawaiRepo.find();
  }

  create(data: Partial<Pegawai>) {
    const pegawai = this.pegawaiRepo.create(data);
    return this.pegawaiRepo.save(pegawai);
  }

  update(id: number, data: Partial<Pegawai>) {
    return this.pegawaiRepo.update(id, data);
  }

  delete(id: number) {
    return this.pegawaiRepo.delete(id);
  }
}
