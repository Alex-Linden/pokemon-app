const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPokemonFromDB(filters = {}) {
  const {
    type,
    ability,
    sortBy = "id",
    order = "asc",
  } = filters;
  return await prisma.pokemon.findMany({
    where: {
      ...(type && { type: { contains: type, mode: "insensitive" } }),
      ...(ability && { ability: { contains: ability, mode: "insensitive" } }),
    },
    orderBy: {
      [sortBy]: order,
    },
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


async function getOrCreatePokemonByName(name) {
  let pokemon = await prisma.pokemon.findUnique({
    where: { name },
  });

  if (pokemon) return pokemon;

  // 2. Fetch from external API if missing
  const fetched = await fetchPokemonFromPokeAPI(name);
  if (!fetched) return null;

  // 3. Insert into DB
  pokemon = await prisma.pokemon.create({ data: fetched });

  return pokemon;
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

async function catchPokemon(userId, pokemonId) {
  const existingCaught = await prisma.caught.findUnique({
    where: {
      userId_pokemonId: {
        userId,
        pokemonId,
      },
    },
  });

  if (existingCaught) {
    throw new Error("You've already caught this Pokémon!");
  }

  return await prisma.caught.create({
    data: {
      userId,
      pokemonId,
    },
  });
}

async function getCaughtPokemonFromDB(userId) {
  return await prisma.caught.findMany({
    where: { userId },
    include: {
      pokemon: {
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
      },
    },
    orderBy: {
      pokemon: {
        name: "asc",
      },
    },
  });
}

async function releasePokemon(userId, pokemonId) {
  const caught = await prisma.caught.findUnique({
    where: {
      userId_pokemonId: {
        userId,
        pokemonId,
      },
    },
  });

  if (!caught) {
    throw new Error("You haven't caught this Pokémon!");
  }

  return await prisma.caught.delete({
    where: {
      userId_pokemonId: {
        userId,
        pokemonId,
      },
    },
  });
}




module.exports = {
  getAllPokemonFromDB,
  getOrCreatePokemonById,
  getOrCreatePokemonByName,
  searchPokemonByName,
  catchPokemon,
  getCaughtPokemonFromDB,
  releasePokemon,
};
