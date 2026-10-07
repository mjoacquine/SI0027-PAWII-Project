// Mini Project - Pertemuan 6-7: Layer Controller
// TODO 2: lengkapi setiap handler agar memanggil fungsi model yang sesuai.

const mahasiswaModel = require("../models/mahasiswaModel");

exports.getAll = (req, res) => {
  // TODO: kirim seluruh data mahasiswa (mahasiswaModel.getAll()) sebagai JSON
  const data = mahasiswaModel.getAll();
  res.json(data);
};

exports.getById = (req, res) => {
  // TODO: ambil id dari req.params, cari via mahasiswaModel.getById(),
  // kirim 404 dengan { message: 'Tidak ditemukan' } jika tidak ada
  const { id } = req.params;
  const data = mahasiswaModel.getById(id);

  if (!data) {
    return res.status(404).json({ message: "Tidak ditemukan" });
  }

  res.json(data);
};

exports.create = (req, res) => {
  // TODO: buat data baru via mahasiswaModel.create(req.body),
  // kirim response dengan status 201
  const newData = mahasiswaModel.create(req.body);
  res.status(201).json(newData);
};
