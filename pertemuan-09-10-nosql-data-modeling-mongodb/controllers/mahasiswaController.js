// Mini Project - Pertemuan 9-10: Controller Mahasiswa
// TODO 2: lengkapi setiap handler agar memanggil Model Mongoose yang sesuai.

const Mahasiswa = require("../models/mahasiswaModel");

exports.getAll = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find().populate('prodiId');
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.id).populate('prodiId');
    if (!mahasiswa) {
      return res.status(404).json({ message: 'Tidak ditemukan' });
    }
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const mahasiswaBaru = await Mahasiswa.create(req.body);
    res.status(201).json(mahasiswaBaru);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const mahasiswaUpdated = await Mahasiswa.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!mahasiswaUpdated) {
      return res.status(404).json({ message: 'Tidak ditemukan' });
    }
    res.status(200).json(mahasiswaUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const mahasiswaDeleted = await Mahasiswa.findByIdAndDelete(req.params.id);
    if (!mahasiswaDeleted) {
      return res.status(404).json({ message: 'Tidak ditemukan' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};