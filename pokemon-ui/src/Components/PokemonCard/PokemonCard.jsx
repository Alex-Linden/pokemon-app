import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Typography,
    Button,
} from "@mui/material";

export default function PokemonCard({ pokemon, onCatch, isCaught, showCatch = false }) {
    return (
        <Box sx={{ position: "relative" }}>
            <Card>
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
                            onClick={() => onCatch(pokemon)}
                        >
                            Catch
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
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
