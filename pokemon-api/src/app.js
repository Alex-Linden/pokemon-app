require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const pokemonRoutes = require("./routes/pokemon.routes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use("/api/pokemon", pokemonRoutes);

// 404 fallback
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// module.exports = app;
