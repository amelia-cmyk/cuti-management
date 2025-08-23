"use client";
import { useEffect, useState } from "react";
import api from "../app/lib/api";

export default function Home() {
  const [pegawai, setPegawai] = useState<any[]>([]);
  const [cuti, setCuti] = useState<any[]>([]);
  const [formPegawai, setFormPegawai] = useState({ namaDepan: "", namaBelakang: "", email: "", noHp: "", alamat: "", jenisKelamin: "" });
  const [formCuti, setFormCuti] = useState({ pegawaiId: "", tanggalMulai: "", keterangan: "" });

  // state untuk edit
  const [editPegawaiId, setEditPegawaiId] = useState<number | null>(null);
  const [editCutiId, setEditCutiId] = useState<number | null>(null);

  const loadData = async () => {
    try {
      const pegawaiRes = await api.get("/pegawai");
      setPegawai(pegawaiRes.data);
      const cutiRes = await api.get("/cuti");
      setCuti(cutiRes.data);
    } catch (err) {
      console.error("Error GET:", err);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Submit Tambah Pegawai
  const handleSubmitPegawai = async (e: any) => {
    e.preventDefault();

    // Validasi: semua field wajib diisi
    const emptyField = Object.entries(formPegawai).find(([key, value]) => !value || value.trim() === "");
    if (emptyField) {
      alert(`Field "${emptyField[0]}" wajib diisi!`);
      return; // stop submit
    }

    try {
      if (editPegawaiId) {
        await api.put(`/pegawai/${editPegawaiId}`, formPegawai);
        setEditPegawaiId(null);
        alert("Pegawai berhasil diperbarui!");
      } else {
        await api.post("/pegawai", formPegawai);
        alert("Pegawai berhasil ditambahkan!");
      }

      // reset form
      setFormPegawai({
        namaDepan: "",
        namaBelakang: "",
        email: "",
        noHp: "",
        alamat: "",
        jenisKelamin: ""
      });

      // reload data
      loadData();
    } catch (err) {
      console.error("Error POST/PUT Pegawai:", err);
      alert("Terjadi kesalahan saat menyimpan data pegawai!");
    }
  };

  // handle edit cuti
  const handleEditPegawai = (pegawai: any) => {
  setEditPegawaiId(pegawai.id);
  setFormPegawai({
    namaDepan: pegawai.namaDepan || "",
    namaBelakang: pegawai.namaBelakang || "",
    email: pegawai.email || "",
    noHp: pegawai.noHp || "",
    alamat: pegawai.alamat || "",
    jenisKelamin: pegawai.jenisKelamin || "",
  });
};

  // Submit Tambah Cuti
  const handleSubmitCuti = async (e: any) => {
    e.preventDefault();
    try {
      if (editCutiId) {
        await api.put(`/cuti/${editCutiId}`, formCuti);
        setEditCutiId(null);
      } else {
        await api.post("/cuti", formCuti);
      }
      setFormCuti({ pegawaiId: "", tanggalMulai: "", keterangan: "" });
      loadData();
    } catch (err) {
      console.error("Error POST/PUT Cuti:", err);
    }
  };

  // Hapus Pegawai
  const handleDeletePegawai = async (id: number) => {
    if (!confirm("Yakin hapus pegawai ini?")) return;
    await api.delete(`/pegawai/${id}`);
    loadData();
  };

  // Hapus Cuti
  const handleDeleteCuti = async (id: number) => {
    if (!confirm("Yakin hapus cuti ini?")) return;
    await api.delete(`/cuti/${id}`);
    loadData();
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Cuti Pegawai</h1>

      {/* Form Tambah/Edit Pegawai */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">{editPegawaiId ? "Edit Pegawai" : "Tambah Pegawai"}</h2>
        <form onSubmit={handleSubmitPegawai} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.keys(formPegawai).map((key) => {
          if (key === "jenisKelamin") {
            return (
              <select
                key={key}
                value={(formPegawai as any)[key]}
                onChange={(e) => setFormPegawai({ ...formPegawai, [key]: e.target.value })}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            );
          }
          return (
            <input
              key={key}
              placeholder={key}
              value={(formPegawai as any)[key]}
              onChange={(e) => setFormPegawai({ ...formPegawai, [key]: e.target.value })}
              className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          );
        })}

          <button type="submit" className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            {editPegawaiId ? "Update Pegawai" : "Tambah Pegawai"}
          </button>
        </form>
      </div>

      {/* Tabel Data Pegawai */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">Data Pegawai</h2>
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">No HP</th>
              <th className="border p-2">Alamat</th>
              <th className="border p-2">Jenis Kelamin</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pegawai.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-2">{p.namaDepan} {p.namaBelakang}</td>
                <td className="border p-2">{p.email}</td>
                <td className="border p-2">{p.noHp}</td>
                <td className="border p-2">{p.alamat}</td>
                <td className="border p-2">{p.jenisKelamin}</td>
                <td className="border p-2 flex gap-2">
                  {/* <button onClick={() => { setEditPegawaiId(p.id); setFormPegawai(p); }} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button> */}
                  <button onClick={() => handleEditPegawai(p)} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDeletePegawai(p.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Tambah/Edit Cuti */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">{editCutiId ? "Edit Cuti" : "Tambah Cuti"}</h2>
        <form onSubmit={handleSubmitCuti} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={formCuti.pegawaiId}
            onChange={(e) => setFormCuti({ ...formCuti, pegawaiId: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">Pilih Pegawai</option>
            {pegawai.map((p) => (
              <option key={p.id} value={p.id}>{p.namaDepan} {p.namaBelakang}</option>
            ))}
          </select>
          <input
            type="date"
            value={formCuti.tanggalMulai}
            onChange={(e) => setFormCuti({ ...formCuti, tanggalMulai: e.target.value })}
            className="border rounded p-2"
          />
          <input
            placeholder="Keterangan"
            value={formCuti.keterangan}
            onChange={(e) => setFormCuti({ ...formCuti, keterangan: e.target.value })}
            className="border rounded p-2"
          />
          <button type="submit" className="col-span-1 md:col-span-3 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            {editCutiId ? "Update Cuti" : "Tambah Cuti"}
          </button>
        </form>
      </div>

      {/* Tabel Data Cuti */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Data Cuti</h2>
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Pegawai</th>
              <th className="border p-2">Tanggal Mulai</th>
              <th className="border p-2">Keterangan</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cuti.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border p-2">{c.pegawai?.namaDepan} {c.pegawai?.namaBelakang}</td>
                <td className="border p-2">{c.tanggalMulai}</td>
                <td className="border p-2">{c.keterangan}</td>
                <td className="border p-2 flex gap-2">
                  <button onClick={() => { setEditCutiId(c.id); setFormCuti({ pegawaiId: c.pegawai?.id, tanggalMulai: c.tanggalMulai, keterangan: c.keterangan }); }} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDeleteCuti(c.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
