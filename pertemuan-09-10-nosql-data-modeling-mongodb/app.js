const express = require("express");
const router = express.Router();
const mahasiswaController = require("../controllers/mahasiswaController");

router.route("/")
  .get(mahasiswaController.getAll)
  .post(mahasiswaController.create);

router.route("/:id")
  .get(mahasiswaController.getById)
  .put(mahasiswaController.update)
  .delete(mahasiswaController.remove);

module.exports = router;