import { PROJECT_NAME } from "@/utils/constants";

export const Root = () => {
    const isAUthenticated = false; // Replace with actual authentication logic

    return (
        <div>
            <h1>Welcome to {PROJECT_NAME}!</h1>
            <h2>Sign in to view your information.</h2>
        </div>
    );
};
