const express = require("express");
const { getAllPokemon, getPokemonById } = require("../controllers/pokemon.controller");

const router = express.Router();

router.get("/", getAllPokemon); // GET /api/pokemon
router.get("/:id", getPokemonById); // GET /api/pokemon/:id

module.exports = router;
