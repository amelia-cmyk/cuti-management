import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pegawai } from './pegawai.entity';

@Injectable()
export class PegawaiService {
  constructor(@InjectRepository(Pegawai) private readonly repo: Repository<Pegawai>) {}

  findAll(): Promise<Pegawai[]> {
    return this.repo.find();
  }

  findAllWithCuti(): Promise<Pegawai[]> {
    return this.repo.find({ relations: ['cuti'] });
  }

  async create(data: Partial<Pegawai>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }

  async update(id: number, data: Partial<Pegawai>) {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  async delete(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) return { deleted: false };
    await this.repo.remove(p);
    return { deleted: true };
  }
}
