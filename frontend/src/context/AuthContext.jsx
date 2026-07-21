import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(
    localStorage.getItem("access_token")
  );

  const [refreshToken, setRefreshTokenState] = useState(
    localStorage.getItem("refresh_token")
  );

  const isAuthenticated = !!accessToken;

  // Save tokens
  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    setAccessTokenState(access);
    setRefreshTokenState(refresh);
  };

  // Remove tokens
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setAccessTokenState(null);
    setRefreshTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}