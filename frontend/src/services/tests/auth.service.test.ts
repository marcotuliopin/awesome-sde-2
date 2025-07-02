import { AuthService } from "../auth.service";
import { publicApi, privateApi } from "@/api/axios";
import type { User } from "@/types/user";

jest.mock("@/api/axios", () => ({
    publicApi: { post: jest.fn() },
    privateApi: { post: jest.fn(), get: jest.fn() },
}));

describe("AuthService", () => {
    const mockUser: User = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user",
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("login", () => {
        it("should login and return user data", async () => {
            (publicApi.post as jest.Mock).mockResolvedValue({ data: mockUser });
            const result = await AuthService.login("test@example.com", "password");
            expect(publicApi.post).toHaveBeenCalledWith("/user/login", {
                email: "test@example.com",
                password: "password",
            });
            expect(result).toEqual(mockUser);
        });

        it("should throw error with server message", async () => {
            (publicApi.post as jest.Mock).mockRejectedValue({
                response: { data: { message: "Invalid credentials" } },
            });
            await expect(
                AuthService.login("test@example.com", "wrongpassword")
            ).rejects.toThrow("Invalid credentials");
        });

        it("should throw generic error if no server response", async () => {
            (publicApi.post as jest.Mock).mockRejectedValue({});
            await expect(
                AuthService.login("test@example.com", "password")
            ).rejects.toThrow("Error connecting to the server");
        });
    });

    describe("logout", () => {
        it("should call logout endpoint", async () => {
            (privateApi.post as jest.Mock).mockResolvedValue({});
            await AuthService.logout();
            expect(privateApi.post).toHaveBeenCalledWith("/user/logout");
        });

        it("should throw error with server message", async () => {
            (privateApi.post as jest.Mock).mockRejectedValue({
                response: { data: { message: "Logout failed" } },
            });
            await expect(AuthService.logout()).rejects.toThrow("Logout failed");
        });

        it("should throw generic error if no server response", async () => {
            (privateApi.post as jest.Mock).mockRejectedValue({});
            await expect(AuthService.logout()).rejects.toThrow(
                "Error connecting to the server"
            );
        });
    });

    describe("register", () => {
        it("should register and return true if status is 202", async () => {
            (publicApi.post as jest.Mock).mockResolvedValue({ status: 202 });
            const result = await AuthService.register(
                "Test User",
                "test@example.com",
                "password"
            );
            expect(publicApi.post).toHaveBeenCalledWith("/user/", {
                name: "Test User",
                email: "test@example.com",
                password: "password",
            });
            expect(result).toBe(true);
        });

        it("should return false if status is not 202", async () => {
            (publicApi.post as jest.Mock).mockResolvedValue({ status: 400 });
            const result = await AuthService.register(
                "Test User",
                "test@example.com",
                "password"
            );
            expect(result).toBe(false);
        });

        it("should throw error with server message", async () => {
            (publicApi.post as jest.Mock).mockRejectedValue({
                response: { data: { message: "Email already exists" } },
            });
            await expect(
                AuthService.register("Test User", "test@example.com", "password")
            ).rejects.toThrow("Email already exists");
        });

        it("should throw generic error if no server response", async () => {
            (publicApi.post as jest.Mock).mockRejectedValue({});
            await expect(
                AuthService.register("Test User", "test@example.com", "password")
            ).rejects.toThrow("Error connecting to the server");
        });
    });

    describe("checkAuth", () => {
        it("should return user data if authenticated", async () => {
            (privateApi.get as jest.Mock).mockResolvedValue({ data: mockUser });
            const result = await AuthService.checkAuth();
            expect(privateApi.get).toHaveBeenCalledWith("/user/me");
            expect(result).toEqual(mockUser);
        });

        it("should return null if not authenticated or error occurs", async () => {
            (privateApi.get as jest.Mock).mockRejectedValue({});
            const result = await AuthService.checkAuth();
            expect(result).toBeNull();
        });
    });
});