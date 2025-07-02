import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Register } from "./Register";
import { BrowserRouter } from "react-router-dom";

// Mock useAuth context
const mockRegister = jest.fn();
const mockLogout = jest.fn();
jest.mock("@/contexts/auth.context", () => ({
    useAuth: () => ({
        register: mockRegister,
        logout: mockLogout,
        isAuthenticated: false,
    }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("<Register />", () => {
    beforeEach(() => {
        mockRegister.mockResolvedValue(true);
    });

    it("renders all input fields and the register button", () => {
        renderWithRouter(<Register />);
        expect(screen.getByTestId("name-input")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
        expect(screen.getByTestId("register-button")).toBeInTheDocument();
    });

    it("shows error if fields are empty and form is submitted", async () => {
        renderWithRouter(<Register />);
        fireEvent.click(screen.getByTestId("register-button"));
        expect(await screen.findByText(/all fields are required/i)).toBeInTheDocument();
    });

    it("shows error for invalid email", async () => {
        renderWithRouter(<Register />);
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "invalidExample" } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "Abc123!" } });
        fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: "Abc123!" } });
        fireEvent.click(screen.getByTestId("register-button"));
        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    });

    it("shows error for weak password", async () => {
        renderWithRouter(<Register />);
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "abc" } });
        fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: "abc" } });
        fireEvent.click(screen.getByTestId("register-button"));
        expect(await screen.findByText(/password must contain at least 6 characters/i)).toBeInTheDocument();
    });

    it("shows error if passwords do not match", async () => {
        renderWithRouter(<Register />);
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "Abc123!" } });
        fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: "Different1!" } });
        fireEvent.click(screen.getByTestId("register-button"));
        expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    });

    it("calls register on valid form submission", async () => {
        const mockRegister = jest.fn(async () => true);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        jest.spyOn(require("@/contexts/auth.context"), "useAuth").mockReturnValue({ register: mockRegister });

        renderWithRouter(<Register />);
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "Abc123!" } });
        fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: "Abc123!" } });
        fireEvent.click(screen.getByTestId("register-button"));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith("Test User", "test@example.com", "Abc123!", "/");
        });
    });

    it("shows alert if register fails", async () => {
        const mockRegister = jest.fn(async () => false);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        jest.spyOn(require("@/contexts/auth.context"), "useAuth").mockReturnValue({ register: mockRegister });
        window.alert = jest.fn();

        renderWithRouter(<Register />);
        fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Test User" } });
        fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: "Abc123!" } });
        fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: "Abc123!" } });
        fireEvent.click(screen.getByTestId("register-button"));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Registration failed. Please try again.");
        });
    });

    it("renders login link", () => {
        renderWithRouter(<Register />);
        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
        expect(screen.getByTestId("go-to-login")).toHaveAttribute("href", "/login");
    });
});