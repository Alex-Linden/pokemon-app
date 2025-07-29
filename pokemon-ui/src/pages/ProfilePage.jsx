import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { getCaughtPokemon } from "../services/pokemon";
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function ProfilePage() {
  const { user } = useAuth();
  const [caught, setCaught] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCaught() {
      try {

        const pokemonList = await getCaughtPokemon();
        console.log("pokemonList", pokemonList);
        setCaught(pokemonList);
      } catch (e) {
        console.error("❌ Error fetching caught Pokémon:", e);
        setError("Failed to load caught Pokémon");
      } finally {
        setLoading(false);
      }
    }

    fetchCaught();
  }, []);

  return (
    <Box mt={4} px={2}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || "Trainer"}!
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && caught.length === 0 && (
        <Typography>You haven't caught any Pokémon yet.</Typography>
      )}

      <Grid container spacing={2}>
        {caught.map((poke) => (
          <Grid item xs={12} sm={6} md={4} key={poke.id}>
            <PokemonCard pokemon={poke} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
