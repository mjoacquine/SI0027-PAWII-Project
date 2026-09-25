// Mini Project - Pertemuan 1: Arsitektur Monolitik
// Tujuan: server merender tampilan HTML langsung untuk dikirim ke browser.

const express = require("express");
const app = express();
const PORT = 3000;

// TODO 1: Data produk
const produk = [
  { nama: "Laptop", harga: 8500000 },
  { nama: "Mouse Wireless", harga: 150000 },
  { nama: "Keyboard Mechanical", harga: 450000 },
];

function renderHalamanProduk(daftarProduk) {
  // TODO 2: Bangun string HTML dari daftarProduk
  const itemHtml = daftarProduk
    .map(
      (item) =>
        `<li><strong>${item.nama}</strong> - Rp ${item.harga.toLocaleString("id-ID")}</li>`
    )
    .join("");

  return `
    <html>
      <head>
        <title>TokoKita - Monolitik</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Daftar Produk (Monolitik)</h1>
        <ul>${itemHtml}</ul>
      </body>
    </html>
  `;
}

app.get("/produk", (req, res) => {
  const html = renderHalamanProduk(produk);
  res.send(html);
});

// Redirect route utama ke /produk
app.get("/", (req, res) => {
  res.redirect("/produk");
});

app.listen(PORT, () => {
  console.log(`Server monolitik berjalan di http://localhost:${PORT}/produk`);
});