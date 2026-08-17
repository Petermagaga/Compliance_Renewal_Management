import axios from "axios";

import env from "../config/env";
import ENDPOINTS from "./endpoints";
import tokenService from "./tokenService";

const authClient = axios.create({
    baseURL: env.apiBaseUrl,
});


class AuthService {

    async login(email, password) {

        const response = await authClient.post(
            ENDPOINTS.AUTH.LOGIN,
            {
                email,
                password,
            }
        );

        const {
            access,
            refresh,
        } = response.data;

        tokenService.setAccessToken(access);
        tokenService.setRefreshToken(refresh);

        return {
            access,
            refresh,
        };
    }


    async getCurrentUser() {

        const accessToken =
            tokenService.getAccessToken();

        if (!accessToken) {
            throw new Error(
                "Access token missing"
            );
        }

        const response =
            await authClient.get(
                ENDPOINTS.AUTH.CURRENT_USER,
                {
                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`,
                    },
                }
            );

        return response.data.data;
    }


    async refreshToken() {

        const refresh =
            tokenService.getRefreshToken();

        if (!refresh) {
            throw new Error(
                "Refresh token missing"
            );
        }

        const response =
            await authClient.post(
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