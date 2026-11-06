export async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-Tails-Request": "1", ...options.headers },
    });
    if (response.status === 401 && !url.startsWith("/api/auth/")) {
        window.dispatchEvent(new Event("session-expired"));
    }
    return response;
}
export async function authRequest(path, body) {
    const response = await apiFetch(`/api/auth/${path}`, body === undefined ? {} : { method: "POST", body: JSON.stringify(body) });
    const result = await response.json();
    if (!response.ok) {
        const error = new Error(result.message || "Something went wrong. Please try again");
        error.status = response.status;
        throw error;
    }
    return result.data;
}
