import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 10,
                px: 3,
            }}
        >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Oops! Page not found.
            </Typography>
            <Typography color="text.secondary" mb={4}>
                The page you’re looking for doesn’t exist or has been moved.
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/")}
            >
                Back to Home
            </Button>
        </Box>
    );
}
