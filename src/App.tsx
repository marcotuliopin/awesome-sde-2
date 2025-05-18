import { useTheme } from "./contexts/ThemeContext";
import { Header } from "@layouts/Header";

function App() {
    const { theme } = useTheme();

    return (
        <div className={`${theme === "dark" ? "dark" : ""} transition-colors duration-500 dark:bg-gray-900 bg-gray-100 min-h-screen`}>
            <Header />
        </div>
    );
}

export default App;
