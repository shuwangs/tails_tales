import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useEntries } from "../../contexts/EntriesContext";
import DetailCard from "../DetailCard";

vi.mock("../../contexts/EntriesContext.jsx", () => ({
	useEntries: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
	const mod = await vi.importActual("react-router-dom");
	return {
		...mod,
		useNavigate: vi.fn(),
	};
});

vi.mock("react-toastify", () => ({
	toast: {
		error: vi.fn(),
	},
}));

vi.mock("../ui/AiDiv.jsx", () => ({
	default: ({ children, className }) => (
		<div className={className}>{children}</div>
	),
}));

describe("DetailCard test", () => {
	const mockEntry = {
		id: 10,
		title: "Bobo had a big stretch",
		entry_date: "2026-04-05",
		mood: "happy",
		content: "Today Bobo stretched near the sunny window.",
	};
	beforeEach(() => {
		useEntries.mockReturnValue({
			deleteEntryHandler: vi.fn(),
			error: null,
			loading: false,
		});
	});

	it("render the key components of the DetailCard", () => {
		render(
			<MemoryRouter>
				<DetailCard entry={mockEntry} />
			</MemoryRouter>,
		);

		expect(
			screen.getByRole("heading", { name: /bobo had a big stretch/i }),
		).toBeInTheDocument();
	});
});
