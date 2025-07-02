import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Button,
} from "@mui/material";
import PokemonCard from "../Components/PokemonCard/PokemonCard";

// Dummy Pokémon data
const dummyPokemon = [
    {
        id: "001",
        name: "Bulbasaur",
        imageUrl: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
        type: "Grass/Poison",
    },
    {
        id: "004",
        name: "Charmander",
        imageUrl: "https://img.pokemondb.net/artwork/large/charmander.jpg",
        type: "Fire",
    },
    {
        id: "007",
        name: "Squirtle",
        imageUrl: "https://img.pokemondb.net/artwork/large/squirtle.jpg",
        type: "Water",
    },
    {
        id: "025",
        name: "Pikachu",
        imageUrl: "https://img.pokemondb.net/artwork/large/pikachu.jpg",
        type: "Electric",
    },
];

export default function BrowsePage() {
    const { user } = useAuth();
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        // In production: fetch from API instead of using dummy data
        setPokemonList(dummyPokemon);
    }, []);

    const handleCatch = (pokemonId) => {
        // In production: POST to backend API
        console.log(`Caught Pokémon with ID: ${pokemonId}`);
        alert(`You caught ${pokemonList.find(p => p.id === pokemonId).name}!`);
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Pokémon Library
            </Typography>

            <Grid container spacing={4}>
                {pokemonList.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={3} key={pokemon.id}>
                        <PokemonCard
                            pokemon={pokemon}
                            onCatch={handleCatch}
                            showCatch={user.isLoggedIn}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
