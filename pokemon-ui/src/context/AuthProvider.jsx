import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getCaughtPokemon } from "../services/pokemon";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [caught, setCaught] = useState([]);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);

                try {
                    const caughtList = await getCaughtPokemon();
                    setCaught(caughtList);
                } catch (e) {
                    console.error("❌ Error fetching caught Pokémon:", e);
                    setCaught([]);
                }
            }
        };

        initializeAuth();
    }, []);



    const login = async ({ user, token }) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        try {
            const caughtList = await getCaughtPokemon();
            setCaught(caughtList);
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
        setCaught([]);
    };

    const refreshCaught = async () => {
        try {
            const caughtList = await getCaughtPokemon();
            setCaught(caughtList);
        } catch (e) {
            console.error("❌ Error refreshing caught Pokémon:", e);
            setCaught([]);
        }
    };

    const isLoggedIn = !!user && !!token;

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, caught, setCaught, refreshCaught }}>
            {children}
        </AuthContext.Provider>
    );
};
