const axios = require("axios");

async function fetchPokemonFromPokeAPI(id) {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    const types = data.types.map((t) => t.type.name).join(", ");
    const stats = Object.fromEntries(data.stats.map((s) => [s.stat.name, s.base_stat]));
    const ability = data.abilities[0]?.ability.name || "unknown";
    const captureRate = speciesRes.data.capture_rate;
    const description = speciesRes.data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text.replace(/\f/g, " ") || "No description available.";

    return {
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.other["official-artwork"].front_default,
      type: types,
      hp: stats.hp,
      attack: stats.attack,
      defense: stats.defense,
      speed: stats.speed,
      height: data.height,
      weight: data.weight,
      ability,
      description,
      captureRate,
    };
  } catch (error) {
    console.error(`❌ Failed to fetch Pokémon #${id}:`, error.message);
    return null;
  }
}

module.exports = { fetchPokemonFromPokeAPI };
