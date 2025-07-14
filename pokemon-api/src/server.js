const app = require("./app");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

// async function startServer() {
//   try {
//     await prisma.$connect();
//     console.log("✅ Connected to database");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server listening on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Error starting server:", err);
//     process.exit(1);
//   }
// }

// startServer();
