import storageService from "./storageService";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

class TokenService {
    getAccessToken() {
        return storageService.get(ACCESS_TOKEN);
    }

    getRefreshToken() {
        return storageService.get(REFRESH_TOKEN);
    }

    setAccessToken(token) {
        storageService.set(ACCESS_TOKEN, token);
    }

    setRefreshToken(token) {
        storageService.set(REFRESH_TOKEN, token);
    }

    setTokens({ access, refresh }) {
        this.setAccessToken(access);
        this.setRefreshToken(refresh);
    }

    clearTokens() {
        storageService.remove(ACCESS_TOKEN);
        storageService.remove(REFRESH_TOKEN);
    }

    isAuthenticated() {
        return !!this.getAccessToken();
    }
}

export default new TokenService();