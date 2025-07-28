import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { loginUser } from "../services/auth";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form); // expects { token, user }
      login(data);
      navigate("/profile");
    } catch (err) {
      const msg = err?.response?.data?.error || "Login failed";
      setError(msg);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            fullWidth
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
