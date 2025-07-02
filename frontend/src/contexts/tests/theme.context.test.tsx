import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../theme.context';

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button data-testid="toggle-button" onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeContext', () => {
    test('should provide default theme as light', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId('theme-value').textContent).toBe('light');
    });

    test('should toggle theme when toggleTheme is called', async () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        // Initial theme should be light
        expect(screen.getByTestId('theme-value').textContent).toBe('light');
        
        // Click toggle button to change theme to dark
        await userEvent.click(screen.getByTestId('toggle-button'));
        expect(screen.getByTestId('theme-value').textContent).toBe('dark');
        
        // Click toggle button again to change theme back to light
        await userEvent.click(screen.getByTestId('toggle-button'));
        expect(screen.getByTestId('theme-value').textContent).toBe('light');
    });

    test('useTheme should throw error when used outside ThemeProvider', () => {
        // Spy on console.error to prevent error messages in test output
        jest.spyOn(console, 'error').mockImplementation(() => {});
        
        const ErrorComponent = () => {
            useTheme();
            return null;
        };

        expect(() => {
            render(<ErrorComponent />);
        }).toThrow('useTheme must be used within a ThemeProvider');
    });
});