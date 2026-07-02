import { createContext, useContext, useState } from "react";

// Create the authentication context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  // Access token
  const [accessToken, setAccessToken] = useState(null);

  // Refresh token
  const [refreshToken, setRefreshToken] = useState(null);

  // Logged-in status
  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}