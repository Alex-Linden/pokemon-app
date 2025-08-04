const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();
const BASE_URL = "https://pokeapi.co/api/v2/pokemon-species";

async function backfillCaptureRates() {
  const allPokemon = await prisma.pokemon.findMany({
    select: { id: true, name: true },
  });

  for (const poke of allPokemon) {
    try {
      const res = await axios.get(`${BASE_URL}/${poke.name}`);
      const captureRate = res.data.capture_rate;

      await prisma.pokemon.update({
        where: { id: poke.id },
        data: { captureRate },
      });

      console.log(`✅ Updated ${poke.name} → captureRate: ${captureRate}`);
    } catch (err) {
      console.error(`❌ Failed for ${poke.name}: ${err.message}`);
    }
  }

  await prisma.$disconnect();
  console.log("🌟 Done backfilling capture rates!");
}

backfillCaptureRates();
