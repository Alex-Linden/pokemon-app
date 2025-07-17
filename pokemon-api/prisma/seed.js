const { PrismaClient } = require("@prisma/client");
const { fetchPokemonFromPokeAPI } = require("../src/utils/pokeapi");

const prisma = new PrismaClient();
const NUM_POKEMON = 151;

async function main() {
  console.log(`🌱 Seeding ${NUM_POKEMON} Pokémon from PokéAPI...`);

  for (let id = 1; id <= NUM_POKEMON; id++) {
    try {
      const pokemon = await fetchPokemonFromPokeAPI(id);

      if (!pokemon) {
        console.warn(`⚠️ Skipping Pokémon #${id} — not found or invalid`);
        continue;
      }

      await prisma.pokemon.upsert({
        where: { id: pokemon.id },
        update: {}, // you can add update logic here if desired
        create: pokemon,
      });

      console.log(`✅ Inserted: ${pokemon.name}`);
    } catch (error) {
      console.error(`❌ Failed to insert Pokémon #${id}: ${error.message}`);
    }
  }

  console.log("🌟 Done seeding all Pokémon.");
}

main()
  .catch((e) => {
    console.error("❌ Seed script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
