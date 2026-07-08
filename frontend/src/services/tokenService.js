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

  setTokens({ access, refresh }) {
    storageService.set(ACCESS_TOKEN, access);
    storageService.set(REFRESH_TOKEN, refresh);
  }

  clearTokens() {
    storageService.remove(ACCESS_TOKEN);
    storageService.remove(REFRESH_TOKEN);
  }

  hasAccessToken() {
    return !!this.getAccessToken();
  }
}

export default new TokenService();