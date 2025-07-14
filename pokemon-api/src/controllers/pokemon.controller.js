const { getAllPokemonFromDB } = require("../services/pokemon.services");

async function getAllPokemon(req, res) {
  try {
    const pokemonList = await getAllPokemonFromDB();
    res.json(pokemonList);
  } catch (error) {
    console.error("❌ Error fetching Pokémon:", error);
    res.status(500).json({ error: "Failed to fetch Pokémon" });
  }
}

module.exports = {
  getAllPokemon,
};
