import { useEffect, useState, useMemo } from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Box,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import PokemonCard from "../Components/PokemonCard/PokemonCard";
import PokemonModal from "../Components/PokemonModal";
import api from "../services/api";
import { catchPokemon, releasePokemon } from "../services/pokemon";

export default function BrowsePage() {
  const { caught, refreshCaught, user } = useAuth();

  // Data state
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  // Fetch Pokémon list
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await api.get("/pokemon");
        setPokemonList(res.data);
      } catch (err) {
        console.error("❌ Fetch error:", err.message);
        setError("Failed to fetch Pokémon. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Get caught Pokémon IDs for quick lookup
  const caughtIds = useMemo(
    () => new Set(caught.map((entry) => entry.pokemon?.id || entry.id)),
    [caught]
  );

  // Catch logic
  const handleCatch = async (pokemon) => {
    try {
      const res = await catchPokemon(pokemon.id);
      await refreshCaught();
      setSnackMessage(`✅ ${res.pokemon.name} caught!`);
      setSnackOpen(true);
      return true; // ✅ success
    } catch (err) {
      const message =
        err.response?.data?.error || `❌ Could not catch ${pokemon.name}`;
      setSnackMessage(message);
      setSnackOpen(true);
      return false; // ❌ failure
    }
  };


  // Modal logic
  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  // Release logic
  const handleRequestRelease = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmRelease = async () => {
    if (!selectedPokemon) return;
    try {
      await releasePokemon(selectedPokemon.id);
      await refreshCaught();
      setSnackMessage(`🧹 Released ${selectedPokemon.name}`);
      setSnackOpen(true);
      setConfirmDialogOpen(false);
      setIsModalOpen(false);
    } catch (err) {
      console.error("❌ Release error:", err);
      setSnackMessage("❌ Failed to release Pokémon");
      setSnackOpen(true);
    }
  };

  const handleCancelRelease = () => {
    setConfirmDialogOpen(false);
  };

  // Snackbar logic
  const handleSnackClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Pokémon...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  // Main render
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokémon Library
      </Typography>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={snackMessage}
      />

      <Grid container spacing={4}>
        {pokemonList.map((pokemon) => (
          <Grid item xs={12} sm={6} md={3} key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              showCatch={!!user && !caughtIds.has(pokemon.id)}
              onCatch={handleCatch}
              isCaught={caughtIds.has(pokemon.id)}
              onClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>

      {selectedPokemon && (
        <>
          <PokemonModal
            open={isModalOpen}
            pokemon={selectedPokemon}
            onClose={handleModalClose}
            onCatch={handleCatch}
            isCaught={caughtIds.has(selectedPokemon?.id)}
          />

          <Dialog open={confirmDialogOpen} onClose={handleCancelRelease}>
            <DialogTitle>Release Pokémon</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to release{" "}
                <strong>{selectedPokemon?.name}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelRelease}>Cancel</Button>
              <Button
                onClick={handleConfirmRelease}
                color="error"
                variant="contained"
              >
                Release
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
