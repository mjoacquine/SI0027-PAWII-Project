// Mini Project - Pertemuan 13-14: Koneksi MongoDB, Routing, Auth & Error Handling
// Jalankan dengan: npm install && npm start (setelah menyalin .env.example menjadi .env)

require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const prodiRoutes = require("./routes/prodiRoutes");
const errorHandler = require("./middlewares/errorHandler");


app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/prodi", prodiRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal terhubung ke MongoDB:", err.message);
    process.exit(1);
  });
