// src/components/ui/AuthModal.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
        <h2 className="text-xl font-bold mb-4">Atenção</h2>
        <p className="mb-6">Você precisa estar autenticado para acessar esta página.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fazer Login
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
