const express = require("express");
const { getAllPokemon, getPokemonById, getPokemonByName, handleSearchPokemonByName } = require("../controllers/pokemon.controller");

const router = express.Router();

// GET /api/pokemon
router.get("/", getAllPokemon);

// GET /api/pokemon/:id
router.get("/:id(\\d+)", getPokemonById);

// GET /api/pokemon/exact?q=pikachu
router.get("/exact", getPokemonByName);

// GET /api/pokemon/search?q=saur
router.get("/search", handleSearchPokemonByName);

module.exports = router;
