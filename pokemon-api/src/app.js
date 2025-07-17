require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const pokemonRoutes = require("./routes/pokemon.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(cors({
  origin: allowedOrigin,
  credentials: true, // allow cookies or auth headers
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/pokemon", pokemonRoutes);
app.use("/api/auth", authRoutes);

// 404 fallback
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;


