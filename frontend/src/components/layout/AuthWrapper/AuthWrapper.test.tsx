import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";


const mockUseAuth = jest.fn();
jest.mock("@/contexts/auth.context", () => ({
    useAuth: () => mockUseAuth(),
}));


const renderWithRoutes = (isAuthenticated: boolean) => {
    mockUseAuth.mockReturnValue({ isAuthenticated });
    return render(
        <MemoryRouter initialEntries={["/protected"]}>
            <Routes>
                <Route element={<AuthWrapper />}>
                    <Route path="/protected" element={<div>Protected Content</div>} />
                </Route>
                <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
        </MemoryRouter>
    );
}


describe("AuthWrapper", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders child routes when authenticated", () => {
        renderWithRoutes(true);
        expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });

    it("redirects to /login when not authenticated", () => {
        renderWithRoutes(false);
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
});