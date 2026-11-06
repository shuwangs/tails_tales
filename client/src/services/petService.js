import { apiFetch } from "./api.js";

async function petRequest(options) {
    const response = await apiFetch("/api/pets", options);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Unable to load or save pets");
    }

    return result.data;
}

export function getMyPets() {
    return petRequest();
}

export function createPet(pet) {
    return petRequest({
        method: "POST",
        body: JSON.stringify(pet),
    });
}