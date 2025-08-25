import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  namaDepan: string;

  @Column()
  namaBelakang: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  tanggalLahir?: Date  | null;

  @Column({ default: 'Pria' })
  jenisKelamin: string;

  @Column()
  passwordHash: string;
}
