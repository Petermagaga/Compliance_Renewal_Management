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

    return (

        <DashboardContext.Provider value={{}}>

            {children}

        </DashboardContext.Provider>

    );

}