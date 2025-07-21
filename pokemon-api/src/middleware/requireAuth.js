const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (err) {
    console.error("❌ Auth error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = requireAuth;
