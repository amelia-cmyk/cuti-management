# Cuti Management

Aplikasi web untuk mengelola data cuti pegawai, terdiri dari **Frontend (Next.js + React)** dan **Backend (NestJS + MySQL)**.

## Fitur Utama
- CRUD Pegawai
- CRUD Cuti
- Validasi cuti:
  - Maksimal 12 hari/tahun
  - Maksimal 1 hari/bulan
- Role-based Access:
  - **Admin:** Mengelola pegawai, cuti, dan user
  - **User/Employee:** Melihat dan mengajukan cuti
- List pegawai beserta cuti masing-masing

## Cara Install & Run

### Backend
```bash
cd backend
npm install
npm run start:dev

### Frontend
cd frontend
npm install
npm run dev

http://localhost:3000/

| Role  | Email                                         | Password |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@example.com](mailto:admin@example.com) | admin123 |
| User  | [user@example.com](mailto:user@example.com)   | user123  |


struktur project
cuti-management/
├─ backend/      # NestJS + MySQL
├─ frontend/     # Next.js + React
└─ README.md

# Checklist Progres - Fullstack Cuti Management

| Fitur / Scope                        | Status        | Catatan                                                                 |
|--------------------------------------|---------------|-------------------------------------------------------------------------|
| **Admin**                             |               |                                                                         |
| Login & Logout Admin                  | ✅ Done       | Fungsi login/logout berjalan dengan validasi email & password           |
| Ubah Profil Admin                     | ✅ Done       | Admin bisa update nama, email, tanggal lahir, jenis kelamin             |
| CRUD Data Admin                       | ⚠️ In Progress| Password hash sudah, form update password opsional belum selesai        |
| Form Update Password Admin            | ❌ Belum      | Belum dibuat                                                            |
| **Pegawai**                           |               |                                                                         |
| CRUD Pegawai                          | ✅ Done       | Semua field tersedia, validasi email & no HP                             |
| Validasi data pegawai                  | ✅ Done       | Field wajib, email valid, no HP angka                                   |
| **Cuti**                              |               |                                                                         |
| CRUD Cuti                              | ⚠️ In Progress| Alasan, tanggal mulai & selesai ada, validasi batas cuti sudah sebagian  |
| Validasi cuti 12 hari/tahun           | ✅ Done       | Validasi backend berjalan                                               |
| Validasi cuti 1 hari/bulan            | ✅ Done       | Validasi backend berjalan                                               |
| **List Pegawai + Cuti**               | ⚠️ In Progress| Tabel ada, endpoint gabungan ada tapi data cuti kadang tidak lengkap    |
| **Validasi Data Input**               |               |                                                                         |
| Email valid di Admin & Pegawai        | ✅ Done       |                                                                         |
| No HP hanya angka                      | ✅ Done       |                                                                         |
| Field wajib diisi                      | ✅ Done       |                                                                         |
| Validasi batas cuti di backend         | ⚠️ In Progress| Validasi 12 hari sudah, validasi 1 hari/bulan sudah                     |
| **Persyaratan Teknis**                |               |                                                                         |
| Frontend Next.js                       | ✅ Done       |                                                                         |
| Backend NestJS                         | ✅ Done       |                                                                         |
| Database MySQL/MariaDB                 | ✅ Done       |                                                                         |


