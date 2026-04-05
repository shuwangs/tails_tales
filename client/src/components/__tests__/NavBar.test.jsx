import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import NavBar from "../NavBar.jsx";

const routes = ["Homes", "Write"];

describe("NavBar test", () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<NavBar />
			</BrowserRouter>,
		);
	});
	it("should verify route layout", async () => {
		expect(await screen.findByText("Home")).toBeVisible();
		expect(await screen.findByText("Write")).toBeVisible();
	});

	it("has correct navigation paths", () => {
		expect(screen.getByRole("link", { name: /bobo's diary/i })).toHaveAttribute(
			"href",
			"/entries",
		);

		expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
			"href",
			"/entries",
		);

		expect(screen.getByRole("link", { name: /write/i })).toHaveAttribute(
			"href",
			"/write",
		);
	});
});
