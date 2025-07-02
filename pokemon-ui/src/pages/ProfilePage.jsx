import { useAuth } from "../context/AuthContext";
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";

const mockCaught = [
    {
        id: "025",
        name: "Pikachu",
        imageUrl: "https://img.pokemondb.net/artwork/large/pikachu.jpg",
        type: "Electric",
    },
    {
        id: "007",
        name: "Squirtle",
        imageUrl: "https://img.pokemondb.net/artwork/large/squirtle.jpg",
        type: "Water",
    },
];

export default function ProfilePage() {
    const { user } = useAuth();
    const [caught, setCaught] = useState([]);

    useEffect(() => {
        // Replace this with an actual fetch to /me
        setCaught(mockCaught);
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome, {user?.name || "Trainer"}!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Email: {user?.email}
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                Your Caught Pokémon
            </Typography>

            {caught.length === 0 ? (
                <Typography>No Pokémon caught yet. Go catch some!</Typography>
            ) : (
                <Grid container spacing={3}>
                    {caught.map((p) => (
                        <Grid item xs={12} sm={6} md={4} key={p.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={p.imageUrl}
                                    alt={p.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{p.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {p.type}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
