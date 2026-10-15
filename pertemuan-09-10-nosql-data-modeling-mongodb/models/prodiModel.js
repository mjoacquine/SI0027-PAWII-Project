const mongoose = require("mongoose");

const prodiSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jenjang: { type: String, default: "S1" },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model("Prodi", prodiSchema);