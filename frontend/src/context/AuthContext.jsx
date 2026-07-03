import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(
    localStorage.getItem("access")
  );

  const [refreshToken, setRefreshTokenState] = useState(
    localStorage.getItem("refresh")
  );

  const isAuthenticated = !!accessToken;

  // Save tokens
  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    setAccessTokenState(access);
    setRefreshTokenState(refresh);
  };

  // Remove tokens
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

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