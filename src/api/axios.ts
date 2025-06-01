import axios, {
    type AxiosResponse,
} from "axios";

const BASE_URL: string = "http://localhost:3000"; // TODO: Change to environment variable

export const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
    withCredentials: true, // Include cookies in requests
});

export const privateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
    withCredentials: true, // Include cookies in requests
});

export const setupAxiosInterceptors = (
    onAuthError: () => void
) => {
    // Response interceptor: Handle 401 Unauthorized errors
    privateApi.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            if (error.response?.status === 401) {
                onAuthError();
            }
            return Promise.reject(error);
        }
    );
};
