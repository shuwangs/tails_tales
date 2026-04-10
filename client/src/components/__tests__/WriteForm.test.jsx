import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { useEntries } from "../../contexts/EntriesContext.jsx";
import WriteForm from "../WriteForm.jsx";

vi.mock("../../contexts/EntriesContext.jsx", () => ({
	useEntries: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: vi.fn(),
	};
});

vi.mock("react-toastify", () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock("../../AiCard.jsx", () => ({
	default: () => <div>AI Card</div>,
}));

describe("WriteForm test", () => {
	const mockNavigate = vi.fn();
	const mockAddEntry = vi.fn();
	vi.clearAllMocks();

	useNavigate.mockReturnValue(mockNavigate);

	useEntries.mockReturnValue({
		petId: 1,
		error: null,
		loading: false,
		addEntry: mockAddEntry,
	});

	it("renders form fields and buttons", () => {
		render(<WriteForm />);

		expect(
			screen.getByRole("heading", { name: /another day/i }),
		).toBeInTheDocument();
	});
});

// REFERENCE: https://medium.com/@1992season/a-way-to-mock-and-test-navigation-events-in-react-by-vitest-c59f9c8ccc0b
