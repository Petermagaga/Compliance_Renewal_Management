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


    
    return (

        <DashboardContext.Provider value={{}}>

            {children}

        </DashboardContext.Provider>

    );

}