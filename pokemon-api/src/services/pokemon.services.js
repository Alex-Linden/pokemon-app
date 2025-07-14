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

module.exports = {
  getAllPokemonFromDB,
};
