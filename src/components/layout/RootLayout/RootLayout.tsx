import { Outlet } from 'react-router-dom';
import { Header } from '@components/layout/Header';
import { useTheme } from '@/contexts/ThemeContext';


export const RootLayout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === "dark" ? "dark" : ""} transition-colors duration-500 dark:bg-gray-900 bg-gray-100 min-h-screen`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};