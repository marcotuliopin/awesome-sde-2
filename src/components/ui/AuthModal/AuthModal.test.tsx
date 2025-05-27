// src/components/ui/__tests__/AuthModal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthModal from '../AuthModal';
import { useNavigate } from 'react-router-dom';

// 1) Mock do React Router
const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('<AuthModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar título, mensagem e botão', () => {
    render(<AuthModal />);

    // título
    expect(
      screen.getByRole('heading', { name: /atenção/i })
    ).toBeInTheDocument();

    // mensagem
    expect(
      screen.getByText(/você precisa estar autenticado para acessar esta página\./i)
    ).toBeInTheDocument();

    // botão
    const button = screen.getByRole('button', { name: /fazer login/i });
    expect(button).toBeInTheDocument();
  });

  it('deve navegar para /login ao clicar em "Fazer Login"', () => {
    render(<AuthModal />);

    const button = screen.getByRole('button', { name: /fazer login/i });
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/login');
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
