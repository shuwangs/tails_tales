import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
			editEntry: vi.fn().mockResolvedValue(mockEntry),
		});
	});

	it("render the key components of the DetailCard", () => {
		render(
			<MemoryRouter>
				<DetailCard entry={mockEntry} />
			</MemoryRouter>,
		);

		expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue(
			mockEntry.title,
		);
		expect(screen.getByRole("textbox", { name: "Story" })).toHaveValue(
			mockEntry.content,
		);
		expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
	});

	it("allows editing and cancelling without saving", () => {
		render(
			<MemoryRouter>
				<DetailCard entry={mockEntry} />
			</MemoryRouter>,
		);
		fireEvent.change(screen.getByLabelText("Title"), {
			target: { value: "New title" },
		});
		expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
		fireEvent.click(
			screen.getByRole("button", { name: "Cancel", exact: true }),
		);
		expect(screen.getByLabelText("Title")).toHaveValue(mockEntry.title);
		expect(useEntries().editEntry).not.toHaveBeenCalled();
	});

	it("submits edited content using the bottom Save button", async () => {
		render(
			<MemoryRouter>
				<DetailCard entry={mockEntry} />
			</MemoryRouter>,
		);
		fireEvent.change(screen.getByLabelText("Story"), {
			target: { value: "New story" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Save" }));
		await waitFor(() =>
			expect(useEntries().editEntry).toHaveBeenCalledWith(10, {
				title: mockEntry.title,
				content: "New story",
				mood: "happy",
				entry_date: "2026-04-05",
			}),
		);
		expect(await screen.findByRole("status")).toHaveTextContent(
			"Changes saved.",
		);
	});

	it("preserves the draft when saving fails", async () => {
		useEntries().editEntry.mockRejectedValue(new Error("Save failed"));
		render(
			<MemoryRouter>
				<DetailCard entry={mockEntry} />
			</MemoryRouter>,
		);
		fireEvent.change(screen.getByLabelText("Story"), {
			target: { value: "Unsaved story" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Save" }));
		expect(await screen.findByRole("alert")).toHaveTextContent("Save failed");
		expect(screen.getByLabelText("Story")).toHaveValue("Unsaved story");
		expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
	});
});
