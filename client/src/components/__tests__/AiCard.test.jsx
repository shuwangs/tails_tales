import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AiCard from "../AiCard.jsx";

describe("AiCard testings", () => {
	it("render the header and a button", () => {
		render(<AiCard />);
		expect(
			screen.getByRole("heading", { name: /ai writing assistant/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /suggest a title/i }),
		).toBeInTheDocument();
	});
});
