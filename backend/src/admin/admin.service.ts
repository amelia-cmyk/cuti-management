import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) {}

  async ensureSeedAdmin() {
    const count = await this.repo.count();
    if (count === 0) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      const a = this.repo.create({
        namaDepan: 'Admin',
        namaBelakang: 'Satu',
        email: 'admin@example.com',
        passwordHash,
        jenisKelamin: 'Pria',
      });
      await this.repo.save(a);
      // credentials default: admin@example.com / admin123
    }
  }

  async create(dto: CreateAdminDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email sudah terdaftar');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const admin = this.repo.create({
      namaDepan: dto.namaDepan,
      namaBelakang: dto.namaBelakang,
      email: dto.email,
      tanggalLahir: dto.tanggalLahir ? new Date(dto.tanggalLahir) : null,
      jenisKelamin: dto.jenisKelamin ?? 'Pria',
      passwordHash,
    });
    return this.repo.save(admin);
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async validate(email: string, password: string) {
    const admin = await this.repo.findOne({ where: { email } });
    if (!admin) return null;
    const ok = await bcrypt.compare(password, admin.passwordHash);
    return ok ? admin : null;
  }

  async updateProfile(id: number, dto: UpdateAdminDto) {
    const payload: Partial<Admin> = {
      ...dto,
      tanggalLahir: dto.tanggalLahir ? (new Date(dto.tanggalLahir) as any) : undefined,
    };
    if (dto.email) {
      const exists = await this.repo.findOne({ where: { email: dto.email } });
      if (exists && exists.id !== id) throw new BadRequestException('Email sudah dipakai');
    }
    await this.repo.update(id, payload);
    return this.findById(id);
  }
}
