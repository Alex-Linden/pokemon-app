const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPokemonFromDB() {
  return await prisma.pokemon.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      type: true,
      description: true,
    },
  });
}

async function getOrCreatePokemonById(id) {
  // 1. Check DB
  let pokemon = await prisma.pokemon.findUnique({ where: { id } });

  if (pokemon) return pokemon;

  // 2. Fetch from external API if missing
  const fetched = await fetchPokemonFromPokeAPI(id);
  if (!fetched) return null;

  // 3. Insert into DB
  pokemon = await prisma.pokemon.create({ data: fetched });

  return pokemon;
}


async function getPokemonByName(name) {
  return await prisma.pokemon.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      type: true,
      hp: true,
      attack: true,
      defense: true,
      speed: true,
      height: true,
      weight: true,
      ability: true,
      description: true,
    },
  });
}

async function searchPokemonByName(nameFragment) {
  return await prisma.pokemon.findMany({
    where: {
      name: {
        contains: nameFragment,
        mode: "insensitive", // case-insensitive match
      },
    },
    orderBy: { name: "asc" },
  });
}

module.exports = {
  getAllPokemonFromDB,
  getOrCreatePokemonById,
  getPokemonByName,
  searchPokemonByName,
};
