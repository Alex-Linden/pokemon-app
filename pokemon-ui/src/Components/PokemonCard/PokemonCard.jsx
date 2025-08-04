import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Typography,
    Button,
} from "@mui/material";

export default function PokemonCard({ pokemon, onCatch, isCaught, onClick, showCatch = false }) {
    return (
        <Box sx={{ position: "relative" }}>
            <Card onClick={() => onClick(pokemon)} sx={{ cursor: "pointer", position: "relative" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={pokemon.imageUrl}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography variant="h6">{pokemon.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Type: {pokemon.type}
                    </Typography>
                    {showCatch && !isCaught ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onCatch(pokemon)
                            }}
                        >
                            Catch
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ mt: 2 }}
                        >
                            Caught
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box >
    );
}
