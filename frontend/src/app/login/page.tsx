// "use client";
// import { useState } from "react";
// import api from "../lib/api";
// import Cookies from "js-cookie";

// export default function LoginPage() {
//   const [email, setEmail] = useState("admin@example.com");
//   const [password, setPassword] = useState("admin123");
//   const [error, setError] = useState("");

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const { data } = await api.post("/admin/login", { email, password });
//       if (!data.ok) {
//         setError(data.message || "Login gagal");
//         return;
//       }
//       localStorage.setItem("token", data.accessToken);
//       window.location.href = "/";
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login gagal");
//     }
//   };

//   return (
//     <main className="max-w-sm mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       {error && <p className="text-red-600 mb-3">{error}</p>}
//       <form onSubmit={submit} className="grid gap-3">
//         <input className="border p-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
//         <input className="border p-2 rounded" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
//         <button className="bg-blue-600 text-white rounded p-2">Masuk</button>
//       </form>
//     </main>
//   );
// }


"use client";
import { useState } from "react";
import api from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/admin/login", { email, password });
      if (!data.ok) {
        setError(data.message || "Login gagal");
        return;
      }
      localStorage.setItem("token", data.accessToken);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={submit} className="grid gap-3">
        <input className="border p-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="border p-2 rounded" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="bg-blue-600 text-white rounded p-2">Masuk</button>
      </form>
    </main>
  );
}
