import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";
import { describe, expect, it } from "vitest";

describe("SearchBar test", () => {
    it("renders search input ", () => {
        render(<SearchBar />);

        const input = screen.getByPlaceholderText("Seaching for diary");

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "text");

    })
})