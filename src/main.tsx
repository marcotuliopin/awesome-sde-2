import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthWrapper from '@/components/ui/AuthWrapper/AuthWrapper'; // ou caminho relativo
import { RootLayout } from '@/components/layout/RootLayout';
import { Root } from '@/routes/root/Root';
import { Login } from '@/routes/login/Login';
import { Register } from '@/routes/register/Register';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
     { index: true, element: <Root /> },
     {
       index: true,
       element: (
         <AuthWrapper>
           <Root />
         </AuthWrapper>
       ),
     },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);