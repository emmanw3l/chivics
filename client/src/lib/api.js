import axios from "axios";
import { auth } from "./firebase";
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",
});
// Attach a fresh Firebase ID token on every request. getIdToken() returns
// the cached token and silently refreshes it in the background once it's
// close to expiring, so we don't need to manage refresh ourselves.
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
