import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WritePage from "./pages/WirtePage";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/entries" element={<HomePage />} />
				<Route path="/write" element={<WritePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
