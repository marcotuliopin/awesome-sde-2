import { render } from "@testing-library/react";
import { RootLayout } from "./RootLayout";
import { useTheme } from "@/contexts/theme.context";

jest.mock("@components/layout/Header", () => ({
    Header: () => <header data-testid="header" />,
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Outlet: () => <div data-testid="outlet" />,
}));

jest.mock("@contexts/themte.context", () => ({
    useTheme: jest.fn(),
}));

describe("<RootLayout />", () => {
    it("renders Header and Outlet", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
        const { getByTestId } = render(<RootLayout />);
        expect(getByTestId("header")).toBeInTheDocument();
        expect(getByTestId("outlet")).toBeInTheDocument();
    });

    it("applies light theme classes when theme is light", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
        const { container } = render(<RootLayout />);
        expect(container.firstChild).toHaveClass("bg-gray-100");
        expect(container.firstChild).not.toHaveClass("dark");
    });

    it("applies dark theme classes when theme is dark", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });
        const { container } = render(<RootLayout />);
        expect(container.firstChild).toHaveClass("dark");
        expect(container.firstChild).toHaveClass("dark:bg-gray-900");
    });
});
