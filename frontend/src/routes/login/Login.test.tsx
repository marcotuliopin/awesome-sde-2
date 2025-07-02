import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import { MemoryRouter } from "react-router-dom";

// Mock useAuth context
jest.mock("@/contexts/auth.context", () => ({
    useAuth: () => ({
        login: jest.fn(),
    }),
}));


describe("<Login />", () => {
    it("renders login form elements", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        expect(screen.getByTestId("login-header")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("login-button")).toBeInTheDocument();
        expect(screen.getByTestId("go-to-register")).toBeInTheDocument();
    });

    it("updates email and password fields on change", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const emailInput = screen.getByTestId(
            "email-input"
        ) as HTMLInputElement;
        const passwordInput = screen.getByTestId(
            "password-input"
        ) as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    it("calls login with correct arguments on submit", async () => {
        const mockLogin = jest.fn().mockResolvedValue(true);
        // Override the mock for this test
        jest.spyOn(
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require("@/contexts/auth.context"),
            "useAuth"
        ).mockReturnValue({ login: mockLogin });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "user@mail.com" },
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "secret" },
        });

        fireEvent.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith(
                "user@mail.com",
                "secret",
                "/"
            );
        });
    });

    it("shows alert if login fails", async () => {
        const mockLogin = jest.fn().mockResolvedValue(false);
        jest.spyOn(
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require("@/contexts/auth.context"),
            "useAuth"
        ).mockReturnValue({ login: mockLogin });
        window.alert = jest.fn();

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "fail@mail.com" },
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "wrong" },
        });

        fireEvent.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith(
                "fail@mail.com",
                "wrong",
                "/"
            );
            expect(window.alert).toHaveBeenCalledWith(
                "Login failed. Please check your credentials."
            );
        });
    });

    it("navigates to register page when link is clicked", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const registerLink = screen.getByTestId("go-to-register");
        expect(registerLink).toHaveAttribute("href", "/register");
    });
});
