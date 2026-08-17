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
    | Fetch authenticated user
    |--------------------------------------------------------------------------
    */

    const fetchCurrentUser =
        async () => {

            try {

                setLoadingUser(true);

                const currentUser =
                    await authService.getCurrentUser();

                console.log(
                    "CURRENT USER:",
                    currentUser
                );

                setUser(currentUser);

                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
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

    const login =
        async (
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
    | Restore user after page refresh
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
                 * API/token layer can handle
                 * token refresh later.
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