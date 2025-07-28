import { Typography, Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LandingPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 8,
                px: 3,
            }}
        >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
                Welcome to Pokémon Trainer Hub
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
                Browse, catch, and collect your favorite Pokémon. Create your profile and become the ultimate trainer!
            </Typography>

            <Box mt={4}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate("/browse")}
                    >
                        Explore Pokémon
                    </Button>

                    {!user && (
                        <>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate("/register")}
                            >
                                Get Started
                            </Button>
                        </>
                    )}
                </Stack>
            </Box>
        </Box>
    );
}
