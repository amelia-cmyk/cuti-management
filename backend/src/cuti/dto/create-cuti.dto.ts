import { IsDateString, IsInt, Min, IsNotEmpty } from 'class-validator';
export class CreateCutiDto {
  @IsInt() @Min(1) pegawaiId: number;
  @IsNotEmpty() alasan: string;
  @IsDateString() tanggalMulai: string;
  @IsDateString() tanggalSelesai: string;
}
