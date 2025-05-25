import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PROJECT_NAME } from "@/utils/constants";
import type { JSX } from "react";
import { CiUser } from "react-icons/ci";

export const Header = (): JSX.Element => {
    return (
        <header className="flex items-center justify-between p-4 pr-6 md:pr-12 bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 from-gray-100 to-gray-200 text-white shadow-lg transition-colors duration-500">
            <div className="text-lg font-bold tracking-wide dark:text-white text-black">
                {PROJECT_NAME}
            </div>
            <nav className="flex items-center">
                <ul className="flex items-center space-x-4">
                    <li>
                        <button className="h-full w-8 align-middle justify-center">
                            <CiUser className="h-full w-full hover:scale-110 transition-all duration-200 hover:cursor-pointer dark:text-gray-100 text-gray-800" />
                        </button>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
