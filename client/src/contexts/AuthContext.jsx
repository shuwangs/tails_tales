import { createContext, useContext, useEffect, useState } from "react";
import { authRequest } from "../services/api.js";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);

    async function restore() {
        setLoading(true); setError("");
        try {
            const user = await authRequest("me");
            setSession({ user, pets: [] });
        } catch (err) { if (err.status !== 401) setError(err.message); }
        finally { setLoading(false); }
    }
    useEffect(() => {
        let active = true;
        authRequest("me")
            .then((user) => {
                if (active) {
                    setSession({ user, pets: [] });
                }
            })
            .catch((err) => {
                if (active && err.status !== 401) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });
        const expire = () => { setSession(null); setSelectedPet(null); };
        window.addEventListener("session-expired", expire);
        return () => { active = false; window.removeEventListener("session-expired", expire); };
    }, []);

    async function authenticate(mode, fields) {
        const data = await authRequest(mode, fields);

        if (mode === "login") {
            setSelectedPet(null);
            setSession({ user: data, pets: [] });
        }
    }

    async function logout() {
        await authRequest("logout", {});
        setSession(null); setSelectedPet(null);
    }
    const petId = selectedPet ?? session?.pets?.[0]?.id;
    return <AuthContext.Provider value={{ session, loading, error, restore, authenticate, logout, petId, setSelectedPet }}>{children}</AuthContext.Provider>;
}


export const useAuth = () => useContext(AuthContext);
