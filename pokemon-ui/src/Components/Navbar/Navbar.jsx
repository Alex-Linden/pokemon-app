import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                >
                    Pokémon Trainer Hub
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/browse">
                        Browse
                    </Button>

                    {!user ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/profile">
                                Profile
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
