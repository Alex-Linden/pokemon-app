import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";
const NUM_POKEMON = 20;

async function fetchPokemonList(limit) {
  const res = await axios.get(`${POKEAPI_BASE}?limit=${limit}`);
  return res.data.results;
}

function extractStat(data, statName) {
  const stat = data.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}

async function fetchPokemonDescription(name) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const entries = res.data.flavor_text_entries;

    const englishEntry = entries.find((entry) => entry.language.name === "en");
    return englishEntry?.flavor_text.replace(/\f|\n/g, " ") || "No description available.";
  } catch (err) {
    console.error(`⚠️ Description not found for ${name}`);
    return "No description available.";
  }
}

async function fetchPokemonDetails(url) {
  const res = await axios.get(url);
  const data = res.data;

  const imageUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;

  const types = data.types.map((t) => t.type.name).join("/");

  const hp = extractStat(data, "hp");
  const attack = extractStat(data, "attack");
  const defense = extractStat(data, "defense");
  const speed = extractStat(data, "speed");

  const ability =
    data.abilities.find((a) => !a.is_hidden)?.ability.name || "unknown";

  const description = await fetchPokemonDescription(data.name);

  return {
    name: data.name,
    imageUrl,
    type: types,
    hp,
    attack,
    defense,
    speed,
    height: data.height,
    weight: data.weight,
    ability,
    description,
  };
}

async function main() {
  console.log(`🌱 Seeding ${NUM_POKEMON} Pokémon with descriptions...`);

  const list = await fetchPokemonList(NUM_POKEMON);

  for (const entry of list) {
    try {
      const pokemon = await fetchPokemonDetails(entry.url);

      await prisma.pokemon.upsert({
        where: { name: pokemon.name },
        update: {},
        create: pokemon,
      });

      console.log(`✅ Inserted: ${pokemon.name}`);
    } catch (error) {
      console.error(`❌ Failed to insert ${entry.name}: ${error.message}`);
    }
  }

  console.log("🌟 Done seeding.");
}

main()
  .catch((e) => {
    console.error("❌ Seed script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
