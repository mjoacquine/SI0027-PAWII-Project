// Mini Project - Pertemuan 5: Middleware & Konfigurasi Backend
// Melanjutkan RESTful API "mahasiswa" dari Pertemuan 3-4.

// TODO 1: muat variabel dari .env menggunakan dotenv
require('dotenv').config();

const express = require("express");
const cors = require('cors');

const app = express();

// TODO 2: gunakan process.env.PORT sebagai PORT, dengan fallback 3000
const PORT = process.env.PORT ?? 3000;

//TODO 3: buat middleware kustom bernama `logger` yang mencatat
// method, url, dan waktu (new Date().toISOString()) setiap request,
// lalu daftarkan dengan app.use(logger) SEBELUM route lain
function logger(req, res, next) {
  const waktu = new Date().toISOString(); // Tambahkan () di sini
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next(); // wajib, agar request lanjut ke handler berikutnya
}

// Global Middlewares
app.use(logger);


// TODO 4: import & gunakan middleware cors dari package 'cors'
// agar frontend (mis. http://localhost:5173) dapat mengakses API ini
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Mock Data
let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi" },
  { id: 2, nama: "Budi", jurusan: "Informatika" },
];

// Custom Middleware: Cek API Key
function cekApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'rahasia123') {
    return res.status(401).json({ message: 'API key tidak valid' });
  }
  next();
}

// --- Routes ---

// GET /mahasiswa (Dengan perlindungan API Key)
app.get('/mahasiswa', cekApiKey, (req, res) => {
  res.json(mahasiswa);
});

// GET /mahasiswa/:id
app.get('/mahasiswa/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = mahasiswa.find((m) => m.id === id);
    if (!data) {
      throw new Error('Tidak ada');
    }
    res.json(data);
  } catch (err) {
    next(err); // ke error handler
  }
});

// POST /mahasiswa
app.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;
  const baru = { id: mahasiswa.length + 1, nama, jurusan };
  mahasiswa.push(baru);
  res.status(201).json(baru);
});

// PUT /mahasiswa/:id
app.put("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });
  
  mahasiswa[index] = { ...mahasiswa[index], ...req.body };
  res.json(mahasiswa[index]);
});

// DELETE /mahasiswa/:id
app.delete("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });
  
  mahasiswa.splice(index, 1);
  res.status(204).send();
});

// TODO 6: tambahkan middleware error-handling terpusat di sini 
// (paling bawah, setelah seluruh route), dengan signature
// (err, req, res, next) -> log err.stack, lalu balas status 500
// dengan JSON { message: 'Terjadi kesalahan pada server' }
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Terjadi kesalahan pada server',
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});