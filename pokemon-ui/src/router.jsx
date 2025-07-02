import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/browse" element={<BrowsePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}
