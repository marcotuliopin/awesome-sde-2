import { render } from "@testing-library/react";
import { RootLayout } from "./RootLayout";
import { useTheme } from "@/contexts/theme.context";
import { RouterProvider } from "react-router-dom";

jest.mock("@components/layout/Header", () => ({
    Header: () => <header data-testid="header" />,
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Outlet: () => <div data-testid="outlet" />,
}));

jest.mock("@contexts/theme.context", () => ({
    useTheme: jest.fn(),
}));

import { createMemoryRouter } from "react-router-dom";

const renderComponent = () => {
    const router = createMemoryRouter([
        {
            path: "/",
            element: <RootLayout />,
        },
    ]);
    return render(<RouterProvider router={router} />);
};

describe("<RootLayout />", () => {
    it("renders Header and Outlet", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
        const { getByTestId } = renderComponent();
        expect(getByTestId("header")).toBeInTheDocument();
        expect(getByTestId("outlet")).toBeInTheDocument();
    });

    it("applies light theme classes when theme is light", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
        const { container } = renderComponent();
        expect(container.firstChild).toHaveClass("bg-gray-100");
        expect(container.firstChild).not.toHaveClass("dark");
    });

    it("applies dark theme classes when theme is dark", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });
        const { container } = renderComponent();
        expect(container.firstChild).toHaveClass("dark");
        expect(container.firstChild).toHaveClass("dark:bg-gray-900");
    });
});
