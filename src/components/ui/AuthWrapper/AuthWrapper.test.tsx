// src/components/ui/__tests__/AuthWrapper.test.tsx
import { render, screen } from "@testing-library/react";
import { AuthWrapper } from "./AuthWrapper";


const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

const Protected = () => <div data-testid="protected">Protected Content</div>;


describe("AuthWrapper", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should render <AuthModal /> when isAuthenticated is false", () => {
        render(
            <AuthWrapper>
                <Protected />
            </AuthWrapper>
        );

        expect(screen.getByTestId("auth-modal")).toBeInTheDocument();
        expect(screen.queryByTestId("protected")).toBeNull();
    });

    // it("should render children when isAuthenticated is true", () => {
    //     render(
    //         <AuthWrapper>
    //             <Protected />
    //         </AuthWrapper>
    //     );

    //     expect(screen.getByTestId("protected")).toBeInTheDocument();
    //     expect(screen.queryByTestId("auth-modal")).toBeNull();
    // });
});
