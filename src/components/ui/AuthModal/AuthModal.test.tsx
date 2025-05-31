import { render, screen, fireEvent } from "@testing-library/react";
import { AuthModal } from "./AuthModal";


const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));


describe("<AuthModal />", () => {
    it("renders correctly", () => {
        render(<AuthModal />);

        expect(screen.getByTestId("warning-header")).toBeInTheDocument();
        expect(screen.getByTestId("warning-message")).toBeInTheDocument();
        const button = screen.getByTestId("login-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Go to Login");
    });

    it("navigates to /login when clicking on button", () => {
        render(<AuthModal />);

        const button = screen.getByTestId("login-button");
        fireEvent.click(button);

        expect(mockUseNavigate).toHaveBeenCalledWith("/login");
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
});
