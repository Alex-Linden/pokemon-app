import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Typography,
} from "@mui/material";

export default function PokemonCard({ pokemon, isCaught, onClick }) {
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
                </CardContent>

                {/* Caught Chip */}
                {isCaught && (
                    <Chip
                        label="Caught"
                        color="success"
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                        }}
                    />
                )}
            </Card>
        </Box>
    );
}
