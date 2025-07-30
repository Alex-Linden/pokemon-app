import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getCaughtPokemon } from "../services/pokemon";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [caught, setCaught] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = async ({ user, token }) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        try {
            const caught = await getCaughtPokemon();
            setCaught(caught);
        } catch (e) {
            console.error("❌ Error fetching caught Pokémon:", e);
            setCaught([]);
        }

    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const isLoggedIn = !!user && !!token;

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, caught, setCaught }}>
            {children}
        </AuthContext.Provider>
    );
};
