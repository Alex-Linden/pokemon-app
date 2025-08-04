import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import PokemonCard from "../Components/PokemonCard/PokemonCard";
import PokemonModal from "../Components/PokemonModal";
import { releasePokemon } from "../services/pokemon";

export default function ProfilePage() {
  const { user, caught, refreshCaught } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

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

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRequestRelease = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmRelease = async () => {
    if (!selectedPokemon) return;
    try {
      await releasePokemon(selectedPokemon.id);
      await refreshCaught();
      setConfirmDialogOpen(false);
      setIsModalOpen(false);
    } catch (err) {
      console.error("❌ Release error:", err);
    }
  };

  const handleCancelRelease = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
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
              <PokemonCard
                pokemon={poke.pokemon || poke}
                onClick={handleCardClick}
                isCaught={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <PokemonModal
        open={isModalOpen}
        pokemon={selectedPokemon}
        onClose={handleModalClose}
        isCaught={true}
        onRelease={handleRequestRelease}
      />

      {/* Confirmation Dialog */}
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
          <Button onClick={handleConfirmRelease} color="error" variant="contained">
            Release
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
