import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    Button,
    Chip,
    Divider,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPokemonById } from "../services/pokemon";

export default function PokemonModal({ open, pokemon, onClose, onCatch, isCaught, onRelease }) {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open || !pokemon?.id) return;

        const fetchPokemon = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getPokemonById(pokemon.id);
                setPokemonInfo(data);
            } catch (err) {
                console.error("❌ Fetch error:", err);
                setError("Failed to fetch Pokémon. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [open, pokemon]);

    const renderLoading = () => (
        <Box textAlign="center" mt={6}>
            <CircularProgress />
            <Typography mt={2}>Loading Pokémon...</Typography>
        </Box>
    );

    const renderError = () => (
        <Box textAlign="center" mt={6}>
            <Typography color="error">{error}</Typography>
        </Box>
    );

    const renderPokemonDetails = () => {
        if (!pokemonInfo) return null;

        return (
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <img src={pokemonInfo.imageUrl} alt={pokemonInfo.name} height={200} />
                <Typography variant="body1">Type: {pokemonInfo.type}</Typography>
                <Typography variant="body2">Ability: {pokemonInfo.ability}</Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    {pokemonInfo.description}
                </Typography>

                <Divider sx={{ my: 2, width: "100%" }} />

                <Typography>Stats:</Typography>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography>HP: {pokemonInfo.hp}</Typography>
                    <Typography>ATK: {pokemonInfo.attack}</Typography>
                    <Typography>DEF: {pokemonInfo.defense}</Typography>
                    <Typography>SPD: {pokemonInfo.speed}</Typography>
                </Box>

                {isCaught ? (
                    <Button variant="outlined" color="error" onClick={() => onRelease(pokemonInfo)}>
                        Release
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onCatch(pokemonInfo)}
                    >
                        Try to Catch
                    </Button>
                )}
            </Box>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{pokemon?.name || "Pokémon Details"}</DialogTitle>
            <DialogContent>
                {loading && renderLoading()}
                {error && renderError()}
                {!loading && !error && renderPokemonDetails()}
            </DialogContent>
        </Dialog>
    );
}
