// Mini Project - Pertemuan 23-24-25: Konsumsi API sungguhan (Axios) & Autentikasi JWT
// Component tree (sudah lengkap dari Pertemuan 17-22): App (state) -> PageHeader, LoginForm|MahasiswaForm, SearchBar, MahasiswaList -> MahasiswaCard
// Routing ("/" & "/tentang") sudah lengkap.
// TODO 3: lengkapi pengambilan data (GET) dan pengiriman data (POST) di bawah ini.

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import api from "./api/axiosInstance";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
import MahasiswaForm from "./components/MahasiswaForm";
import MahasiswaList from "./components/MahasiswaList";
import LoginForm from "./components/LoginForm";
import Tentang from "./components/Tentang";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function DaftarMahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    api
      .get("/mahasiswa")
      .then((res) => {
        const dataList = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setMahasiswa(dataList);
      })
      .catch(() => {
        setError("Gagal memuat data mahasiswa");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleTambah(mahasiswaBaru) {
    try {
      const res = await api.post("/mahasiswa", mahasiswaBaru);
      const itemBaru = res.data?.data ?? res.data;
      setMahasiswa((prev) => [...prev, itemBaru]);
    } catch {
      alert("Gagal menambah data (pastikan Anda sudah login)");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  const mahasiswaTersaring = mahasiswa.filter((m) =>
    (m?.nama ?? "").toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      {isLoggedIn ? (
        <>
          <MahasiswaForm onTambah={handleTambah} />
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <LoginForm onLoginBerhasil={() => setIsLoggedIn(true)} />
      )}

      <SearchBar keyword={keyword} onSearch={setKeyword} />

      {loading && <p>Memuat...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <MahasiswaList mahasiswa={mahasiswaTersaring} />}

      <footer className="env-footer">Terhubung ke: {API_BASE_URL}</footer>
    </>
  );
}

function App() {
  return (
    <div className="app">
      <PageHeader judul="Daftar Mahasiswa" />
      <Routes>
        <Route path="/" element={<DaftarMahasiswaPage />} />
        <Route path="/tentang" element={<Tentang />} />
      </Routes>
    </div>
  );
}

export default App;