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
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getPokemonById } from "../services/pokemon";
import CatchingAnimation from "./CatchingAnimation";

export default function PokemonModal({ open, pokemon, onClose, onCatch, isCaught, onRelease }) {
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isCatching, setIsCatching] = useState(false);
    const [catchResult, setCatchResult] = useState(null);

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

    const handleCatchClick = async () => {
        setIsCatching(true);
        const result = await onCatch(pokemonInfo);
        setCatchResult(result);
        setTimeout(() => {
            setIsCatching(false);
        }, 2000);
    };

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
            <>
                <CatchingAnimation
                    isCatching={isCatching}
                    result={catchResult}
                    onClose={() => setCatchResult(null)}
                />

                <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
                    <img src={pokemonInfo.imageUrl} alt={pokemonInfo.name} height={200} />
                    <Typography variant="h6" textTransform="capitalize">{pokemonInfo.name}</Typography>
                    <Typography variant="body1">Type: {pokemonInfo.type}</Typography>
                    <Typography variant="body2">Ability: {pokemonInfo.ability}</Typography>
                    <Typography variant="body2" sx={{ fontStyle: "italic", textAlign: "center" }}>
                        {pokemonInfo.description}
                    </Typography>

                    <Divider sx={{ my: 2, width: "100%" }} />

                    <Typography variant="subtitle1">Stats:</Typography>
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <Typography>HP: {pokemonInfo.hp}</Typography>
                        <Typography>ATK: {pokemonInfo.attack}</Typography>
                        <Typography>DEF: {pokemonInfo.defense}</Typography>
                        <Typography>SPD: {pokemonInfo.speed}</Typography>
                    </Box>

                    {isCaught ? (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => onRelease(pokemonInfo)}
                            disabled={isCatching}
                            fullWidth
                        >
                            Release
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCatchClick}
                            disabled={isCatching}
                            fullWidth
                        >
                            Try to Catch
                        </Button>
                    )}
                </Box>
            </>
        );
    };

    return (
        <Dialog open={open} onClose={isCatching ? null : onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {pokemon?.name || "Pokémon Details"}
                {!isCatching && (
                    <IconButton edge="end" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent>
                {loading && renderLoading()}
                {error && renderError()}
                {!loading && !error && renderPokemonDetails()}
            </DialogContent>
        </Dialog>
    );
}
