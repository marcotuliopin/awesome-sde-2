import { render, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeContext, type Theme } from "@contexts/ThemeContext";

jest.mock("react-icons/fa", () => ({
    FaMoon: (props: any) => <svg data-testid="moon" {...props} />,
    FaSun: (props: any) => <svg data-testid="sun" {...props} />,
}));

const toggleThemeMock = jest.fn();

const renderWithTheme = (theme: Theme) => {
    return render(
        <ThemeContext.Provider
            value={{ theme: theme, toggleTheme: toggleThemeMock }}
        >
            <ThemeToggle />
        </ThemeContext.Provider>
    );
};

describe("ThemeToggle", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it("renders moon icon when theme is light", () => {
        const { getByTestId } = renderWithTheme("light");
        expect(getByTestId("moon-icon")).toBeInTheDocument();
    });

    it("renders sun icon when theme is dark", () => {
        const { getByTestId } = renderWithTheme("dark");
        expect(getByTestId("sun-icon")).toBeInTheDocument();
    });

    it("calls toggleTheme when button is clicked", () => {
        const { getByTestId } = renderWithTheme("light");
        fireEvent.click(getByTestId("theme-toggle-button"));
        expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    });

    it("has correct aria-label for switching to dark mode", () => {
        const { getByTestId } = renderWithTheme("light");
        expect(getByTestId("theme-toggle-button")).toHaveAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    });

    it("has correct aria-label for switching to light mode", () => {
        const { getByTestId } = renderWithTheme("dark");
        expect(getByTestId("theme-toggle-button")).toHaveAttribute(
            "aria-label",
            "Switch to light mode"
        );
    });
});
