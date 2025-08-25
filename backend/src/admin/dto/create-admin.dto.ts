import { IsEmail, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
export class CreateAdminDto {
  @IsNotEmpty() namaDepan: string;
  @IsNotEmpty() namaBelakang: string;
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsOptional() @IsDateString() tanggalLahir?: string;
  @IsOptional() jenisKelamin?: string;
}
