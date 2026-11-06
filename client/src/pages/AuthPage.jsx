import { useState } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AuthPage({ register = false }) {
    const navigate = useNavigate();
    const { session, authenticate } = useAuth();
    const location = useLocation();
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    if (session) return <Navigate to="/entries" replace />;
    async function submit(event) {
        event.preventDefault(); setError(""); setBusy(true);
        const fields = Object.fromEntries(new FormData(event.currentTarget));
        try {
            await authenticate(register ? "register" : "login", fields);

            navigate("/entries", { replace: true });

        } catch (err) {
            setError(err.message);
        } finally { setBusy(false); }
    }
    const inputClass = "w-full rounded-xl border border-amber-300 bg-white p-3 mt-1 text-amber-950 focus:outline-amber-600";
    return <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm text-amber-900">
            <p className="font-heading text-3xl">🐾 Tails & Tales</p>
            <h1 className="font-heading">{register ? "Start your pet’s story" : "Welcome back"}</h1>
            <p className="mb-6">{register ? "A little home for your favorite memories." : "Your pet’s next chapter is waiting."}</p>
            <form onSubmit={submit} className="space-y-4">
                {register && <label className="block">Your name<input className={inputClass} name="username" autoComplete="nickname" maxLength={100} required /></label>}
                <label className="block">Email<input className={inputClass} name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                <label className="block">Password<input className={inputClass} name="password" type="password" autoComplete={register ? "new-password" : "current-password"} minLength={register ? 15 : undefined} maxLength={128} required />{register && <span className="text-sm">Use at least 15 characters. A memorable phrase works well.</span>}</label>
                {register && <>
                    <label className="block">Pet’s name<input className={inputClass} name="petName" maxLength={100} required /></label>
                    <label className="block">Pet type<select name="animalType" className={inputClass}><option value="dog">Dog</option><option value="cat">Cat</option></select></label>
                </>}
                {error && <p role="alert" className="text-red-700">{error}</p>}
                <button disabled={busy} className="w-full rounded-xl bg-amber-700 p-3 text-white hover:bg-amber-800 disabled:opacity-50">{busy ? "Please wait…" : register ? "Create account" : "Log in"}</button>
            </form>
            <p className="mt-6 text-center">{register ? "Already have an account? " : "New here? "}<Link className="underline font-semibold" to={register ? "/login" : "/register"} state={location.state}>{register ? "Log in" : "Create an account"}</Link></p>
        </section>
    </main>;
}
