import axios from "axios";

import env from "../config/env";
import ENDPOINTS from "./endpoints";
import tokenService from "./tokenService";

const authClient = axios.create({
    baseURL: env.apiBaseUrl,
});

class AuthService {

    async refreshToken() {

        const refresh = tokenService.getRefreshToken();

        if (!refresh) {
            throw new Error("Refresh token missing");
        }

        const response = await authClient.post(
            ENDPOINTS.AUTH.REFRESH,
            {
                refresh,
            }
        );

        tokenService.setAccessToken(
            response.data.access
        );

        return response.data.access;
    }

    logout() {

        tokenService.clearTokens();

        window.location.href = "/login";

    }

}

export default new AuthService();