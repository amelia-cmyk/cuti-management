import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pegawai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  namaDepan: string;

  @Column()
  namaBelakang: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  noHp: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ nullable: true })
  jenisKelamin: string;
}
