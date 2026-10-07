// Mini Project - Pertemuan 6-7: Layer Route
// TODO 3: daftarkan ketiga endpoint berikut, arahkan ke fungsi controller yang sesuai.

const express = require("express");
const router = express.Router();
const mahasiswaController = require("../controllers/mahasiswaController");

// TODO: GET /  -> mahasiswaController.getAll
router.get("/", mahasiswaController.getAll);

// TODO: GET /:id -> mahasiswaController.getById
router.get("/:id", mahasiswaController.getById);

// TODO: POST / -> mahasiswaController.create
router.post("/", mahasiswaController.create);

module.exports = router;
