const {
  getAllPokemonFromDB,
  getOrCreatePokemonById,
  getOrCreatePokemonByName,
  searchPokemonByName,
  catchPokemon,
  getCaughtPokemonFromDB,
  releasePokemon,
} = require("../services/pokemon.services");

async function getAllPokemon(req, res) {
  const { type, ability, sortBy, order } = req.query;

  try {
    const pokemonList = await getAllPokemonFromDB({ type, ability, sortBy, order });
    res.json(pokemonList);
  } catch (error) {
    console.error("❌ Error fetching Pokémon:", error);
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

// POST /api/pokemon/:id/catch (requires auth)
async function catchPokemonForUser(req, res) {
  const { id } = req.params;
  const userId = req.user.id; // Corrected destructuring

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid Pokémon ID" });
  }

  try {
    const pokemon = await getOrCreatePokemonById(parsedId);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    await catchPokemon(userId, pokemon.id);

    res.status(201).json({
      message: "Pokémon caught!",
      pokemon,
    });
  } catch (error) {
    console.error("❌ Error catching Pokémon:", error);

    if (error.message.includes("already caught")) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to catch Pokémon" });
  }
}

async function getCaughtPokemonForUser(req, res) {
  const userId = req.user.id;

  try {
    const caught = await getCaughtPokemonFromDB(userId);
    const pokemonList = caught.map((entry) => entry.pokemon); // flatten

    res.json(pokemonList);
  } catch (error) {
    console.error("❌ Error fetching caught Pokémon:", error);
    res.status(500).json({ error: "Failed to fetch caught Pokémon" });
  }
}

async function releasePokemonForUser(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid Pokémon ID" });
  }

  try {
    const pokemon = await getOrCreatePokemonById(parsedId);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    await releasePokemon(userId, pokemon.id);

    res.status(200).json({
      message: "Pokémon released!",
      pokemon,
    });
  } catch (error) {
    console.error("❌ Error releasing Pokémon:", error);

    if (error.message.includes("haven't caught")) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to release Pokémon" });
  }
}




module.exports = {
  getAllPokemon,
  getPokemonById,
  getPokemonByName,
  handleSearchPokemonByName,
  catchPokemonForUser,
  getCaughtPokemonForUser,
  releasePokemonForUser,
};
