import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import dashboardService from "../services/dashboardService";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchDashboard = async () => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await dashboardService.getDashboard();

            setDashboard(response.data);

        }

        catch (err) {

            console.error(err);

            setError(err);

        }

        finally {

            setLoading(false);

        }

    };

    const refresh = () => {

        fetchDashboard();

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    const value = {

        dashboard,

        loading,

        error,

        refresh,

    };

    return (




        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>


    );

}

export function useDashboard() {

    const context = useContext(DashboardContext);

    if (!context) {

        throw new Error(

            "useDashboard must be used within DashboardProvider"

        );

    }

    return context;

}