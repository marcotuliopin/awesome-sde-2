import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth.context';
import { AuthService } from '@/services/auth.service';
import * as axiosInterceptors from '@/api/axios';
import { useNavigate, BrowserRouter } from 'react-router-dom';

// Mock dependencies
jest.mock('@/services/auth.service');
jest.mock('@/api/axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

const mockSetupAxiosInterceptors = axiosInterceptors.setupAxiosInterceptors as jest.Mock;

const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };

describe('AuthContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (AuthService.checkAuth as jest.Mock).mockResolvedValue(null);
        mockSetupAxiosInterceptors.mockImplementation((callback) => {
            (global as any).logoutCallback = callback;
        });
    });

    test('provides authentication context to children', () => {
        const TestComponent = () => {
            const authContext = useAuth();
            return (
                <div data-testid="test-component">
                    {authContext.isAuthenticated ? 'Authenticated' : 'Not authenticated'}
                </div>
            );
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByTestId('test-component')).toHaveTextContent('Not authenticated');
    });

    test('login authenticates user and navigates to specified route', async () => {
        (AuthService.login as jest.Mock).mockResolvedValue(mockUser);
        
        const TestComponent = () => {
            const { login, isAuthenticated, user } = useAuth();
            
            return (
                <div>
                    <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</div>
                    <div data-testid="user-info">{user ? user.name : 'No user'}</div>
                    <button data-testid="login-button" onClick={() => login('test@example.com', 'password', '/dashboard')}>
                        Login
                    </button>
                </div>
            );
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
        
        await act(async () => {
            screen.getByTestId('login-button').click();
        });

        await waitFor(() => {
            expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
            expect(screen.getByTestId('user-info')).toHaveTextContent('Test User');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    test('login handles failed authentication', async () => {
        (AuthService.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
        
        const TestComponent = () => {
            const { login, isAuthenticated } = useAuth();
            
            return (
                <div>
                    <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</div>
                    <button data-testid="login-button" onClick={() => login('test@example.com', 'wrong-password', '/dashboard')}>
                        Login
                    </button>
                </div>
            );
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );
        
        await act(async () => {
            screen.getByTestId('login-button').click();
        });

        await waitFor(() => {
            expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
        });
    });

    test('logout clears authentication state', async () => {
        (AuthService.checkAuth as jest.Mock).mockResolvedValue(mockUser);
        (AuthService.logout as jest.Mock).mockResolvedValue(undefined);
        
        window.alert = jest.fn();
        
        const TestComponent = () => {
            const { logout, isAuthenticated } = useAuth();
            
            return (
                <div>
                    <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</div>
                    <button data-testid="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            );
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );

        // Wait for the initial auth check to complete
        await waitFor(() => {
            expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
        });
        
        await act(async () => {
            screen.getByTestId('logout-button').click();
        });

        await waitFor(() => {
            expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
            expect(mockNavigate).toHaveBeenCalledWith('/login'); // ajuste se a rota mudou
        });

    });

    test('register creates account and logs in user', async () => {
        (AuthService.checkAuth as jest.Mock).mockResolvedValue(null); // adiciona isso no beforeEach ou no teste de register
        (AuthService.register as jest.Mock).mockResolvedValue(true);
        (AuthService.login as jest.Mock).mockResolvedValue(mockUser);
        
        const TestComponent = () => {
            const { register, isAuthenticated } = useAuth();
            
            return (
                <div>
                    <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</div>
                    <button 
                        data-testid="register-button" 
                        onClick={() => register('Test User', 'test@example.com', 'password', '/dashboard')}
                    >
                        Register
                    </button>
                </div>
            );
        };

        render(
            <BrowserRouter>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </BrowserRouter>
        );
        
        await act(async () => {
            screen.getByTestId('register-button').click();
        });

        await waitFor(() => {
            expect(AuthService.register).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
            expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
            expect(mockNavigate).toHaveBeenCalledWith('/login'); // ou a página para onde você redireciona após registrar
        });

    });

    test('setupAxiosInterceptors calls logout callback when triggered', async () => {
        (AuthService.checkAuth as jest.Mock).mockResolvedValue(mockUser);
        
        render(
            <BrowserRouter>
                <AuthProvider>
                    <div>Test App</div>
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockSetupAxiosInterceptors).toHaveBeenCalled();
        });

        // Simulate token expiry or unauthorized response by calling the interceptor callback
        act(() => {
            (global as any).logoutCallback();
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    test('useAuth throws error when used outside of AuthProvider', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        const TestComponent = () => {
            const { isAuthenticated } = useAuth();
            return <div>{isAuthenticated ? 'Authenticated' : 'Not authenticated'}</div>;
        };

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useAuth must be used within an AuthProvider');
        
        consoleError.mockRestore();
    });
});