const express = require("express");
const router = express.Router();
const genresController = require("../../controllers/api/genresController");

router.get("/", genresController.getAll);

module.exports = router;
