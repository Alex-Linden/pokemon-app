import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
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
    setError("");

    try {
      const data = await registerUser(form); // expects { token, user }
      login(data);
      navigate("/profile");
    } catch (err) {
      setError(
        err?.response?.data?.error || "Could not register user"
      );
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            fullWidth
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
