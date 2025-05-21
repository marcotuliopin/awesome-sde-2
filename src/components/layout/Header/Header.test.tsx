import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import "@testing-library/jest-dom";

// Mock ThemeToggle component
jest.mock("@/components/ui/ThemeToggle", () => ({
    ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

describe("<Header />", () => {
    it("renders the header with the correct title", () => {
        render(<Header />);
        expect(screen.getByText("Store It")).toBeInTheDocument();
    });

    it("renders the user icon button", () => {
        render(<Header />);
        const userButton = screen.getAllByRole("button")[0];
        expect(userButton).toBeInTheDocument();
    });

    it("renders the ThemeToggle component", () => {
        render(<Header />);
        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    });

    it("has correct navigation structure", () => {
        render(<Header />);
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBe(2);
    });
});