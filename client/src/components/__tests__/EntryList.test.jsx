import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { useEntries } from "../../contexts/EntriesContext.jsx";
import EntryList from "../EntryList.jsx";

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
