import { createContext, useContext, useEffect, useState } from "react";
import { authRequest } from "../services/api.js";
import { getMyPets, createPet } from "../services/petService.js";
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
            const pets = await getMyPets();
            setSelectedPet(null);

            setSession({ user, pets });
        } catch (err) { if (err.status !== 401) setError(err.message); }
        finally { setLoading(false); }
    }
    useEffect(() => {
        let active = true;
        authRequest("me")
            .then(async (user) => {
                const pets = await getMyPets();

                if (active) {
                    setSession({ user, pets });
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
            const pets = await getMyPets();

            setSelectedPet(null);
            setSession({ user: data, pets });
        }
    }

    async function logout() {
        await authRequest("logout", {});
        setSession(null); setSelectedPet(null);
    }

    async function addPet(fields) {
        const pet = await createPet(fields);

        setSession((current) => {
            if (!current) return current;

            return {
                ...current,
                pets: [...current.pets, pet],
            };
        });

        setSelectedPet(pet.id);
        return pet;
    }

    const petId = selectedPet ?? session?.pets?.[0]?.id;

    const values = {
        session,
        loading,
        error,
        restore,
        authenticate,
        logout,
        petId,
        setSelectedPet,
        addPet
    }

    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}


export const useAuth = () => useContext(AuthContext);
