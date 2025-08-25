import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pegawai } from '../pegawai/pegawai.entity';

@Entity()
export class Cuti {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  tanggalMulai: string;

  @Column({ nullable: true })
  keterangan: string;

  @ManyToOne(() => Pegawai, (p) => p.cuti, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'pegawaiId' })
  pegawai: Pegawai;

  @Column()
  pegawaiId: number; // kolom FK yang eksplisit
}
