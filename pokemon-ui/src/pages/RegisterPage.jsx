import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { registerUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(form);
            login(data);
            navigate("/profile");
        } catch (err) {
            setError("Could not register user");
        }
    };

    return (
        <Box maxWidth="sm" mx="auto">
            <Typography variant="h4" gutterBottom>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Register
                </Button>
            </form>
        </Box>
    );
}
