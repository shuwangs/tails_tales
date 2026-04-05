import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import EntryList from "../EntryList.jsx";
import { useEntries } from "../../contexts/EntriesContext.jsx";

vi.mock("../../contexts/EntriesContext.jsx", () => ({
	useEntries: vi.fn(),
}));

vi.mock("../EntryCard.jsx", () => ({
	default: ({ entry }) => <div>{entry.title}</div>,
}));

describe("EntryList", () => {
	it("shows loading state", () => {
		useEntries.mockReturnValue({
			entries: [],
			loading: true,
			error: null,
		});

		render(
			<MemoryRouter>
				<EntryList />
			</MemoryRouter>,
		);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});
});
