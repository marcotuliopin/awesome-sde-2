// src/components/ui/AuthWrapper.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth'; // ou '../../utils/auth'
import AuthModal from '../AuthModal/AuthModal';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
const isAuthenticated = false;
  // se não estiver autenticado, mostra o modal
  if (!isAuthenticated) return <AuthModal />;
  // caso contrário, renderiza a rota protegida
  return <>{children}</>;
};

export default AuthWrapper;
