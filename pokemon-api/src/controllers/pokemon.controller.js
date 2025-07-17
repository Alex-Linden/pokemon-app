const { getAllPokemonFromDB, getOrCreatePokemonById, getOrCreatePokemonByName, searchPokemonByName } = require("../services/pokemon.services");

async function getAllPokemon(req, res) {
  try {
    const pokemonList = await getAllPokemonFromDB();
    res.json(pokemonList);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ error: "Failed to fetch Pokémon" });
  }
}

async function getPokemonById(req, res) {
  const { id } = req.params;

  // Validate ID
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid Pokémon ID" });
  }

  try {
    const pokemon = await getOrCreatePokemonById(parsedId);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    res.json(pokemon);
  } catch (error) {
    console.error("❌ Error fetching Pokémon by ID:", error);
    res.status(500).json({ error: "Failed to fetch Pokémon" });
  }
}

// GET /api/pokemon/exact?q=pikachu
async function getPokemonByName(req, res) {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Missing or invalid query parameter" });
  }

  try {
    const pokemon = await getOrCreatePokemonByName(q.toLowerCase());

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    res.json(pokemon);
  } catch (err) {
    console.error("❌ Error fetching Pokémon by name:", err);
    res.status(500).json({ error: "Failed to fetch Pokémon" });
  }
}

// GET /api/pokemon/search?q=saur
async function handleSearchPokemonByName(req, res) {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: "Missing or invalid query parameter" });
  }

  try {
    const matches = await searchPokemonByName(q.toLowerCase());
    res.json(matches);
  } catch (err) {
    console.error("❌ Error searching Pokémon:", err);
    res.status(500).json({ error: "Failed to search Pokémon" });
  }
}

module.exports = {
  getAllPokemon,
  getPokemonById,
  getPokemonByName,
  handleSearchPokemonByName,
};
