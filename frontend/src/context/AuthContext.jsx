import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import authService from "../services/authService";
import tokenService from "../services/tokenService";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] =
        useState(
            tokenService.getAccessToken()
        );

    const [refreshToken, setRefreshToken] =
        useState(
            tokenService.getRefreshToken()
        );


    const [user, setUser] =
        useState(() => {

            const stored =
                localStorage.getItem("user");

            if (
                !stored ||
                stored === "undefined"
            ) {
                return null;
            }

            try {
                return JSON.parse(stored);
            } catch {
                return null;
            }

        });


    const [loadingUser, setLoadingUser] =
        useState(
            !!accessToken
        );


    const isAuthenticated =
        !!accessToken;


    /*
    |--------------------------------------------------------------------------
    | Load current authenticated user
    |--------------------------------------------------------------------------
    */

    const fetchCurrentUser =
        async () => {

            try {

                setLoadingUser(true);

                const response =
                    await authService.getCurrentUser();

                const currentUser =
                    response.data;

                setUser(currentUser);

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        currentUser
                    )
                );

                return currentUser;

            } catch (error) {

                console.error(
                    "Failed to load current user:",
                    error
                );

                setUser(null);

                localStorage.removeItem(
                    "user"
                );

                throw error;

            } finally {

                setLoadingUser(false);

            }

        };


    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    const login = (
        access,
        refresh
    ) => {

        tokenService.setAccessToken(
            access
        );

        tokenService.setRefreshToken(
            refresh
        );

        setAccessToken(access);

        setRefreshToken(refresh);

    };


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    const logout = () => {

        tokenService.clearTokens();

        localStorage.removeItem(
            "user"
        );

        setAccessToken(null);

        setRefreshToken(null);

        setUser(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Restore authenticated user after page refresh
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!accessToken) {

            setLoadingUser(false);

            return;

        }

        fetchCurrentUser()
            .catch(() => {
                /*
                 * Token may be expired or invalid.
                 * Your API layer can handle refresh.
                 */
            });

    }, [accessToken]);


    return (

        <AuthContext.Provider
            value={{

                accessToken,

                refreshToken,

                user,

                isAuthenticated,

                loadingUser,

                login,

                logout,

                fetchCurrentUser,

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    return useContext(
        AuthContext
    );

}