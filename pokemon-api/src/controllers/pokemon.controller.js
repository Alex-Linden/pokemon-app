const { getAllPokemonFromDB, getOrCreatePokemonById, getPokemonByName, searchPokemonByName } = require("../services/pokemon.services");

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



module.exports = {
  getAllPokemon,
  getPokemonById,
};
