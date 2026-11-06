import { useState } from "react";
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import CreatePetForm from "./components/CreatePetForm";
import NavBar from "./components/NavBar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { EntriesProvider } from "./contexts/EntriesContext";
import AuthPage from "./pages/AuthPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import WritePage from "./pages/WirtePage";
import "./App.css";

function ProtectedLayout() {
	const { session, logout, petId, setSelectedPet } = useAuth();
	const location = useLocation();
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);
	if (!session)
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	async function signOut() {
		setBusy(true);
		setError("");
		try {
			await logout();
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	}
	return (
		<>
			<NavBar
				petName={session.pets.find((pet) => pet.id === petId)?.pet_name}
			/>
			<div className="pt-20 px-6 flex flex-wrap items-center justify-end gap-4 text-amber-900">
				<span>{session.user.username}</span>
				{session.pets.length > 1 && (
					<label>
						Pet{" "}
						<select
							aria-label="Current pet"
							value={petId}
							onChange={(e) => setSelectedPet(Number(e.target.value))}
						>
							{session.pets.map((pet) => (
								<option key={pet.id} value={pet.id}>
									{pet.pet_name}
								</option>
							))}
						</select>
					</label>
				)}
				<button onClick={signOut} disabled={busy} className="underline py-2">
					{busy ? "Logging out…" : "Log out"}
				</button>
				{error && <p role="alert">{error}</p>}
			</div>
			{petId ? (
				<EntriesProvider key={`${session.user.id}:${petId}`} petId={petId}>
					<Outlet />
				</EntriesProvider>
			) : (
				<main className="px-4">
					<CreatePetForm />
				</main>
			)}{" "}
		</>
	);
}

function AppRoutes() {
	const { loading, error, restore } = useAuth();
	if (loading)
		return (
			<p role="status" className="p-8 text-amber-900">
				Loading your diary…
			</p>
		);
	if (error)
		return (
			<div className="p-8">
				<p role="alert">{error}</p>
				<button onClick={restore}>Try again</button>
			</div>
		);
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<AuthPage key="login" />} />
			<Route path="/register" element={<AuthPage key="register" register />} />
			<Route element={<ProtectedLayout />}>
				<Route path="/entries" element={<HomePage />} />
				<Route path="/write" element={<WritePage />} />
				<Route path="/entries/:id" element={<DetailPage />} />
			</Route>
			<Route path="*" element={<Navigate to="/entries" replace />} />
		</Routes>
	);
}
export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
}
