import type { JSX } from "react";

export const Header = (): JSX.Element => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <div className="text-lg font-bold">My App</div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#home" className="hover:text-gray-400">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-gray-400">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-gray-400">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};