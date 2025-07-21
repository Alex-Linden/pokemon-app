const express = require("express");
const {
  getAllPokemon,
  getPokemonById,
  getPokemonByName,
  handleSearchPokemonByName,
  catchPokemonForUser,
  getCaughtPokemonForUser,
  releasePokemonForUser,
} = require("../controllers/pokemon.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET /api/pokemon
router.get("/", getAllPokemon);

// GET /api/pokemon/:id
router.get("/:id(\\d+)", getPokemonById);

// GET /api/pokemon/exact?q=pikachu
router.get("/exact", getPokemonByName);

// GET /api/pokemon/search?q=saur
router.get("/search", handleSearchPokemonByName);

// POST /api/pokemon/:id/catch (requires auth)
router.post("/:id/catch", requireAuth, catchPokemonForUser);

// GET /api/pokemon/caught (requires auth)
router.get("/caught", requireAuth, getCaughtPokemonForUser);

//DELETE /api/pokemon/:id/release (requires auth)
router.delete("/:id/release", requireAuth, releasePokemonForUser);

module.exports = router;
