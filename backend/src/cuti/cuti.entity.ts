import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pegawai } from '../pegawai/pegawai.entity';

@Entity()
export class Cuti {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' }) // Pastikan ini type date
  tanggalMulai: Date;

  @Column({ nullable: true })
  keterangan: string;

  @ManyToOne(() => Pegawai, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pegawaiId' })
  pegawai: Pegawai;

  @Column()
  pegawaiId: number;

}
