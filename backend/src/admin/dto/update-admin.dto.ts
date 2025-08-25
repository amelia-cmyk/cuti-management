import { IsEmail, IsOptional, IsDateString } from 'class-validator';
export class UpdateAdminDto {
  @IsOptional() namaDepan?: string;
  @IsOptional() namaBelakang?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsDateString() tanggalLahir?: string;
  @IsOptional() jenisKelamin?: string;
  // kalau mau ganti password nanti bisa tambahkan field khusus
}
