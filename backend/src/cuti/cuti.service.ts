import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuti } from './cuti.entity';
import { CreateCutiDto } from './dto/create-cuti.dto';
import { UpdateCutiDto } from './dto/update-cuti.dto';
import { Pegawai } from '../pegawai/pegawai.entity';

@Injectable()
export class CutiService {
  constructor(
    @InjectRepository(Cuti) private repo: Repository<Cuti>,
    @InjectRepository(Pegawai) private pegawaiRepo: Repository<Pegawai>,
  ) {}

  findAll() {
    // eager sudah aktif, tapi tetap aman kalau ingin pakai relations
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async create(dto: CreateCutiDto) {
    const pegawai = await this.pegawaiRepo.findOne({ where: { id: dto.pegawaiId } });
    if (!pegawai) throw new NotFoundException('Pegawai tidak ditemukan');

    const cuti = this.repo.create({
      tanggalMulai: dto.tanggalMulai,
      keterangan: dto.keterangan,
      pegawaiId: dto.pegawaiId,
      pegawai, // set relasinya juga (opsional krn ada pegawaiId)
    });

    return this.repo.save(cuti);
  }

  async update(id: number, dto: UpdateCutiDto) {
    const cuti = await this.repo.findOne({ where: { id } });
    if (!cuti) throw new NotFoundException('Cuti tidak ditemukan');

    if (dto.pegawaiId) {
      const pegawai = await this.pegawaiRepo.findOne({ where: { id: dto.pegawaiId } });
      if (!pegawai) throw new NotFoundException('Pegawai tidak ditemukan');
      cuti.pegawaiId = dto.pegawaiId;
      cuti.pegawai = pegawai;
    }

    if (dto.tanggalMulai !== undefined) cuti.tanggalMulai = dto.tanggalMulai;
    if (dto.keterangan !== undefined) cuti.keterangan = dto.keterangan;

    return this.repo.save(cuti);
  }

  async delete(id: number) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Cuti tidak ditemukan');
    return { ok: true };
  }
}
