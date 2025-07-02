import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import "@testing-library/jest-dom";
import { PROJECT_NAME } from "@/utils/constants";

// Mock ThemeToggle component
jest.mock("@/components/ui/ThemeToggle", () => ({
    ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    Link: ({
        children,
        to,
        className,
    }: {
        children: React.ReactNode;
        to: string;
        className?: string;
    }) => (
        <a href={to} className={className}>
            {children}
        </a>
    ),
}));

const mockUseAuth = jest.fn();
jest.mock("@/contexts/auth.context", () => ({
    useAuth: () => mockUseAuth(),
}));

describe("<Header />", () => {
    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: { name: "Test User" },
        });
    });
    it("renders the header with the correct title", () => {
        render(<Header />);
        expect(screen.getByText(PROJECT_NAME)).toBeInTheDocument();
    });

    it("renders the user icon button", () => {
        render(<Header />);
        expect(screen.getByTestId("header-login-button")).toBeInTheDocument();
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
        expect(listItems.length).toBe(3);
    });

    it("displays user greeting when authenticated", () => {
        render(<Header />);
        expect(screen.getByTestId("user-greeting")).toHaveTextContent(
            "Hello, Test User"
        );
    });

    it("does not display user greeting when not authenticated", () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            user: null,
        });
        render(<Header />);
        expect(screen.queryByTestId("user-greeting")).not.toBeInTheDocument();
    });

    it("displays the correct user name", () => {
        render(<Header />);
        expect(screen.getByText("Test User")).toBeInTheDocument();
    });

    it("displays a placeholder user name when user is null", () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            user: null,
        });
        render(<Header />);
        expect(screen.getByText("User")).toBeInTheDocument();
    });
});
