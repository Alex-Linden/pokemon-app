import Navbar from "../components/Navbar/Navbar";
import { Container } from "@mui/material";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {children}
            </Container>
        </>
    );
}
