// Mini Project - Pertemuan 1: Arsitektur Decoupled (Backend)
// Tujuan: backend hanya menyediakan data murni (JSON), tidak merender tampilan.

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

// TODO 1: Data produk
const produk = [
  { nama: "Laptop", harga: 8500000 },
  { nama: "Mouse Wireless", harga: 150000 },
  { nama: "Keyboard Mechanical", harga: 450000 },
];

// TODO 2: Kirim data produk sebagai JSON
app.get("/api/produk", (req, res) => {
  res.json(produk);
});

app.listen(PORT, () => {
  console.log(`Backend API decoupled berjalan di http://localhost:${PORT}/api/produk`);
});