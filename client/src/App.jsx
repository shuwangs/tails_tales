import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { EntriesProvider } from "./contexts/EntriesContext";
import HomePage from "./pages/HomePage";
import WritePage from "./pages/WirtePage";
import DetailPage from "./pages/DetailPage";
import "./App.css";

function App() {
	return (
		<BrowserRouter>

			<NavBar />
			<EntriesProvider>
				<Routes>
					<Route path="/entries" element={<HomePage />} />
					<Route path="/write" element={<WritePage />} />
					<Route path="/entries/:id" element={<DetailPage />} />
				</Routes>
			</EntriesProvider>
		</BrowserRouter>
	);
}

export default App;
