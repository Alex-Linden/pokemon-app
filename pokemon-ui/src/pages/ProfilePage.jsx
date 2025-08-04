import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../context/useAuth";
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function ProfilePage() {
  const { user, caught, refreshCaught } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCaught = async () => {
      setLoading(true);
      try {
        await refreshCaught();
      } catch (e) {
        console.error("❌ Error loading caught Pokémon:", e);
        setError("Failed to load caught Pokémon");
      } finally {
        setLoading(false);
      }
    };

    loadCaught();
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
            <PokemonCard pokemon={poke.pokemon || poke} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
