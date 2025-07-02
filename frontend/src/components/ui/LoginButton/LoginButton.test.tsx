import { render, fireEvent } from "@testing-library/react";
import { LoginButton } from "./LoginButton";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// Mock useAuth context
const mockLogout = jest.fn();
const mockUseAuth = jest.fn();
jest.mock("@/contexts/auth.context", () => ({
    useAuth: () => mockUseAuth(),
}));

describe("<LoginButton />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the button with the user icon", () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            logout: mockLogout,
        });
        const { getByTestId } = render(<LoginButton />);
        expect(getByTestId("header-login-button")).toBeInTheDocument();
    });

    it("navigates to /login when not authenticated and clicked", () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            logout: mockLogout,
        });
        const { getByTestId } = render(<LoginButton />);
        fireEvent.click(getByTestId("header-login-button"));
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("calls logout when authenticated and clicked", () => {
        mockUseAuth.mockReturnValue({
            isAuthenticated: true,
            logout: mockLogout,
        });
        const { getByTestId } = render(<LoginButton />);
        fireEvent.click(getByTestId("header-login-button"));
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
