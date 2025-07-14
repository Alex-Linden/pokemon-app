const express = require("express");
const { getAllPokemon } = require("../controllers/pokemon.controller");

const router = express.Router();

router.get("/", getAllPokemon); // GET /api/pokemon

module.exports = router;
