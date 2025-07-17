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

async function getPokemonById(id) {
  return await prisma.pokemon.findUnique({
    where: { id },
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
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
};
