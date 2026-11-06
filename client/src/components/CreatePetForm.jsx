import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function CreatePetForm() {
    const { addPet } = useAuth();
    const [petName, setPetName] = useState("");
    const [animalType, setAnimalType] = useState("dog");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (busy) return;

        const name = petName.trim();
        if (!name) {
            setError("Please enter your pet’s name.");
            return;
        }

        setBusy(true);
        setError("");

        try {
            await addPet({
                pet_name: name,
                animal_type: animalType,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    }

    const inputClass =
        "mt-1 w-full rounded-xl border border-amber-300 bg-white p-3 focus:outline-amber-600";

    return (
        <section className="mx-auto my-10 w-full max-w-md rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-sm">
            <h1 className="font-heading text-3xl">Create pet profile</h1>
            <p className="mt-2 mb-6">
                Tell us about your pet to start their diary.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset disabled={busy} className="space-y-4">
                    <label className="block">
                        Pet’s name
                        <input
                            className={inputClass}
                            name="pet_name"
                            value={petName}
                            onChange={(event) =>
                                setPetName(event.target.value)
                            }
                            maxLength={100}
                            placeholder="e.g. Bobo"
                            required
                        />
                    </label>

                    <label className="block">
                        Pet type
                        <select
                            className={inputClass}
                            name="animal_type"
                            value={animalType}
                            onChange={(event) =>
                                setAnimalType(event.target.value)
                            }
                        >
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                        </select>
                    </label>

                    {error && (
                        <p role="alert" className="text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-amber-700 p-3 text-white hover:bg-amber-800 disabled:opacity-50"
                        disabled={busy}
                    >
                        {busy ? "Creating…" : "Create pet profile"}
                    </button>
                </fieldset>
            </form>
        </section>
    );
}