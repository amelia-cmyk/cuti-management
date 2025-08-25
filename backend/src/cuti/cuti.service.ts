// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Cuti } from './cuti.entity';
// import { CreateCutiDto } from './dto/create-cuti.dto';
// import { UpdateCutiDto } from './dto/update-cuti.dto';
// import { Pegawai } from '../pegawai/pegawai.entity';

// @Injectable()
// export class CutiService {
//   constructor(
//     @InjectRepository(Cuti) private repo: Repository<Cuti>,
//     @InjectRepository(Pegawai) private pegawaiRepo: Repository<Pegawai>,
//   ) {}

//   findAll() {
//     // eager sudah aktif, tapi tetap aman kalau ingin pakai relations
//     return this.repo.find({ order: { id: 'DESC' } });
//   }

//   async create(dto: CreateCutiDto) {
//     const pegawai = await this.pegawaiRepo.findOne({ where: { id: dto.pegawaiId } });
//     if (!pegawai) throw new NotFoundException('Pegawai tidak ditemukan');

//     const cuti = this.repo.create({
//       tanggalMulai: dto.tanggalMulai,
//       keterangan: dto.keterangan,
//       pegawaiId: dto.pegawaiId,
//       pegawai, // set relasinya juga (opsional krn ada pegawaiId)
//     });

//     return this.repo.save(cuti);
//   }

//   async update(id: number, dto: UpdateCutiDto) {
//     const cuti = await this.repo.findOne({ where: { id } });
//     if (!cuti) throw new NotFoundException('Cuti tidak ditemukan');

//     if (dto.pegawaiId) {
//       const pegawai = await this.pegawaiRepo.findOne({ where: { id: dto.pegawaiId } });
//       if (!pegawai) throw new NotFoundException('Pegawai tidak ditemukan');
//       cuti.pegawaiId = dto.pegawaiId;
//       cuti.pegawai = pegawai;
//     }

//     if (dto.tanggalMulai !== undefined) cuti.tanggalMulai = dto.tanggalMulai;
//     if (dto.keterangan !== undefined) cuti.keterangan = dto.keterangan;

//     return this.repo.save(cuti);
//   }

//   async delete(id: number) {
//     const res = await this.repo.delete(id);
//     if (!res.affected) throw new NotFoundException('Cuti tidak ditemukan');
//     return { ok: true };
//   }
// }





import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm';
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
    return this.repo.find({ order: { id: 'DESC' } });
  }

  // ---- CREATE DENGAN VALIDASI ----
  async create(dto: CreateCutiDto) {
    const pegawai = await this.pegawaiRepo.findOne({ where: { id: dto.pegawaiId } });
    if (!pegawai) throw new NotFoundException('Pegawai tidak ditemukan');

    // Validasi cuti
    await this.validateCuti(dto.pegawaiId, dto.tanggalMulai);

    const cuti = this.repo.create({
      tanggalMulai: dto.tanggalMulai,
      keterangan: dto.keterangan,
      pegawaiId: dto.pegawaiId,
      pegawai,
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

    if (dto.tanggalMulai !== undefined) {
      // Validasi cuti saat update tanggal
      await this.validateCuti(cuti.pegawaiId, dto.tanggalMulai, cuti.id);
      cuti.tanggalMulai = dto.tanggalMulai;
    }

    if (dto.keterangan !== undefined) cuti.keterangan = dto.keterangan;

    return this.repo.save(cuti);
  }

  async delete(id: number) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Cuti tidak ditemukan');
    return { ok: true };
  }

  // ---- VALIDASI CUTI ----
  private async validateCuti(pegawaiId: number, tanggalMulai: string, excludeId?: number) {
    const date = new Date(tanggalMulai);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // 1. Maksimal 12 hari/tahun
    const startYear = new Date(`${year}-01-01`);
    const endYear = new Date(`${year}-12-31`);
    const totalTahunan = await this.repo.count({
      where: {
        pegawaiId,
        tanggalMulai: Between(
          startYear.toISOString().split('T')[0],
          endYear.toISOString().split('T')[0],
        ),
        ...(excludeId ? { id: Not(excludeId) } : {}),
      },
    });

    if (totalTahunan >= 12) {
      throw new BadRequestException('Pegawai sudah mencapai batas 12 hari cuti dalam 1 tahun');
    }

    // 2. Maksimal 1 hari/bulan
    const startMonth = new Date(`${year}-${month}-01`);
    const endMonth = new Date(year, month, 0);
    const totalBulan = await this.repo.count({
      where: {
        pegawaiId,
        tanggalMulai: Between(
          startMonth.toISOString().split('T')[0],
          endMonth.toISOString().split('T')[0],
        ),
        ...(excludeId ? { id: Not(excludeId) } : {}),
      },
    });

    if (totalBulan >= 1) {
      throw new BadRequestException('Pegawai sudah mengambil cuti 1 hari di bulan yang sama');
    }
  }
}
