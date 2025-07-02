import { privateApi, publicApi } from "@/api/axios";
import type { User } from "@/types/user";

export const AuthService = {
    login: async (email: string, password: string): Promise<User> => {
        try {
            const response = await publicApi.post("/user/login", {
                email,
                password,
            }); //Server returns a JWT as an HTTP-only cookie
            return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // TODO: add type for error
            if (error.response?.data) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Error connecting to the server");
        }
    },

    logout: async (): Promise<void> => {
        try {
            await privateApi.post("/user/logout");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response?.data) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Error connecting to the server");
        }
    },

    register: async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            const response = await publicApi.post("/user/", {
                name,
                email,
                password,
            });
            return response.status === 202;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response?.data) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Error connecting to the server");
        }
    },

    checkAuth: async (): Promise<User | null> => {
        try {
            const response = await privateApi.get("/user/me");
            return response.data as User;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
