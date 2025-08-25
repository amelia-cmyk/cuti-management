"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ProfilePage() {
  const [form, setForm] = useState({
    namaDepan: "",
    namaBelakang: "",
    email: "",
    tanggalLahir: "",
    jenisKelamin: "Pria",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { window.location.href = "/login"; return; }
    api.get("/admin/me")
      .then(({ data }) => {
        setForm({
          namaDepan: data?.namaDepan || "",
          namaBelakang: data?.namaBelakang || "",
          email: data?.email || "",
          tanggalLahir: data?.tanggalLahir ? String(data.tanggalLahir).substring(0, 10) : "",
          jenisKelamin: data?.jenisKelamin || "Pria",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.patch("/admin/me/profile", form);
      setMessage("Profil berhasil diperbarui!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Gagal memperbarui profil");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <main className="max-w-lg mx-auto p-6 bg-white shadow rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Profil Admin</h1>
      {message && <p className="text-green-600 mb-3">{message}</p>}
      <form onSubmit={handleUpdate} className="grid gap-3">
        <input className="border rounded p-2" placeholder="Nama Depan"
          value={form.namaDepan} onChange={(e) => setForm({ ...form, namaDepan: e.target.value })}/>
        <input className="border rounded p-2" placeholder="Nama Belakang"
          value={form.namaBelakang} onChange={(e) => setForm({ ...form, namaBelakang: e.target.value })}/>
        <input className="border rounded p-2" placeholder="Email" type="email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        <input className="border rounded p-2" type="date"
          value={form.tanggalLahir} onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}/>
        <select className="border rounded p-2"
          value={form.jenisKelamin} onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}>
          <option>Pria</option>
          <option>Wanita</option>
        </select>
        <div className="flex gap-2 justify-end mt-3">
          <a href="/" className="px-3 py-2 border rounded">Kembali</a>
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Simpan</button>
        </div>
      </form>
    </main>
  );
}
