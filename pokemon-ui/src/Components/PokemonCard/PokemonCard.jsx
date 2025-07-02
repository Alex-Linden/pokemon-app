import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

export default function PokemonCard({ pokemon, onCatch, showCatch = false }) {
    return (
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
                {showCatch && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => onCatch(pokemon.id)}
                    >
                        Catch
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
