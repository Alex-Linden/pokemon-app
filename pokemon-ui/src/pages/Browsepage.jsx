import { useEffect, useState } from "react";
import { Typography, Grid, CircularProgress, Box } from "@mui/material";
import { useAuth } from "../context/useAuth";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import api from "../services/api";

export default function BrowsePage() {
  const { user } = useAuth();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await api.get("/pokemon");
        setPokemonList(res.data);
      } catch (err) {
        setError("Failed to fetch Pokémon. Please try again.");
        console.error("❌ Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleCatch = (pokemonId) => {
    alert(`Caught Pokémon with ID: ${pokemonId}`);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading Pokémon...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokémon Library
      </Typography>

      <Grid container spacing={4}>
        {pokemonList.map((pokemon) => (
          <Grid item xs={12} sm={6} md={3} key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              showCatch={!!user}
              onCatch={handleCatch}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
