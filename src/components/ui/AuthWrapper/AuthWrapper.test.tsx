// src/components/ui/__tests__/AuthWrapper.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthWrapper from '../AuthWrapper';
import * as authUtil from '@/utils/auth';

// 1) Mock do módulo de autenticação
jest.mock('@/utils/auth', () => ({
  isAuthenticated: jest.fn(),
}));

// 2) Mock do AuthModal
jest.mock('../AuthModal/AuthModal', () => () => (
  <div data-testid="auth-modal">Please log in</div>
));

describe('AuthWrapper', () => {
  const Protected = () => <div data-testid="protected">Protected Content</div>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve renderizar <AuthModal /> quando isAuthenticated() retorna false', () => {
    // arrange: simula não autenticado
    (authUtil.isAuthenticated as jest.Mock).mockReturnValue(false);

    render(
      <AuthWrapper>
        <Protected />
      </AuthWrapper>
    );

    // assert: Modal aparece, children NÃO aparecem
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    expect(screen.queryByTestId('protected')).toBeNull();
  });

  it('deve renderizar os filhos quando isAuthenticated() retorna true', () => {
    // arrange: simula autenticado
    (authUtil.isAuthenticated as jest.Mock).mockReturnValue(true);

    render(
      <AuthWrapper>
        <Protected />
      </AuthWrapper>
    );

    // assert: children aparecem, modal NÃO aparece
    expect(screen.getByTestId('protected')).toBeInTheDocument();
    expect(screen.queryByTestId('auth-modal')).toBeNull();
  });
});
