import { IsInt, IsDateString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCutiDto {
  @IsInt()
  @Type(() => Number)
  pegawaiId: number;

  @IsDateString()
  tanggalMulai: string;

  @IsOptional()
  @IsString()
  keterangan?: string;
}
