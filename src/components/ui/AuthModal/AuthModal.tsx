// src/components/ui/AuthModal.tsx
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

export const AuthModal = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div
            data-testid="auth-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                <h2
                    data-testid="warning-header"
                    className="text-xl font-bold mb-4"
                >
                    Attention!
                </h2>
                <p data-testid="warning-message" className="mb-6">
                    You need to be authenticated to access this page.
                </p>
                <button
                    type="button"
                    data-testid="login-button"
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};
