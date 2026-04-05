import "@testing-library/jest-dom/vitest"
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EntryCard from "../EntryCard.jsx";

vi.mock("../../utils/getIcons.js", () => ({
    getMoodIcon: vi.fn(() => "😸")
}));

describe("EntryCard", () => {
    const mockEntry = {
        title: "Cozy Cat Morning",
        mood: "happy",
        content: "I sat by the window, watched birds, and then went back to sleep.",
        entry_date: "2026-04-04",
    };

    it("renders title, mood icon, content, and formatted date", () => {
        render(<EntryCard entry={mockEntry} />)

        expect(
            screen.getByRole("heading", { name: /cozy cat morning/i })
        ).toBeInTheDocument();

        expect(screen.getByText("😸")).toBeInTheDocument();

        expect(
            screen.getByText(/i sat by the window, watched birds, and then went back to sleep/i),
        ).toBeInTheDocument();

    })

})
