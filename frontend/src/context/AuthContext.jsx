import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access_token")
    );

    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem("refresh_token")
    );



    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");

        if (!stored || stored === "undefined") {
            return null;
        }

        try {
            return JSON.parse(stored);
        } catch {
            return null;
        }
    });    


    const isAuthenticated = !!accessToken;

    const login = (access, refresh, user) => {

        localStorage.setItem("access_token", access);

        localStorage.setItem("refresh_token", refresh);

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setAccessToken(access);

        setRefreshToken(refresh);

        setUser(user);

    };

    const logout = () => {

        localStorage.removeItem("access_token");

        localStorage.removeItem("refresh_token");

        localStorage.removeItem("user");

        setAccessToken(null);

        setRefreshToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                accessToken,

                refreshToken,

                user,

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