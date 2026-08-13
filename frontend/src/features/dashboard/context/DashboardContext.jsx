import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import dashboardService from "../services/dashboardService";
import complianceService from "../services/complianceService";


const [dashboardLoading, setDashboardLoading] = useState(true);
const [dashboardError, setDashboardError] = useState(null);

const [complianceLoading, setComplianceLoading] = useState(true);
const [complianceError, setComplianceError] = useState(null);

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {

    const [dashboard, setDashboard] = useState(null);

    const [complianceItems, setComplianceItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    
    const fetchDashboard = async () => {

        setDashboardLoading(true);
        setDashboardError(null);

        try {

            const response =
                await dashboardService.getDashboard();

            console.log(
                "Dashboard API response:",
                response
            );

            const dashboardData =
                response.data?.data;

            setDashboard(
                dashboardData || null
            );

        } catch (err) {

            console.error(
                "Dashboard API failed:",
                err
            );

            setDashboardError(err);

        } finally {

            setDashboardLoading(false);

        }


        setComplianceLoading(true);
        setComplianceError(null);

        try {

            const complianceResponse =
                await complianceService.getItems();

            console.log(
                "Compliance API response:",
                complianceResponse
            );

            const complianceData =
                complianceResponse.data;

            if (Array.isArray(complianceData)) {

                setComplianceItems(
                    complianceData
                );

            } else {

                setComplianceItems(
                    complianceData?.results || []
                );

            }

        } catch (err) {

            console.error(
                "Compliance API failed:",
                err
            );

            setComplianceError(err);

        } finally {

            setComplianceLoading(false);

        }

    };



    const refresh = async () => {

        await fetchDashboard();

    };

    useEffect(() => {

        fetchDashboard();

    }, []);



    const value = {

        dashboard,

        summary:
            dashboard?.summary ?? null,

        charts:
            dashboard?.charts ?? null,

        reminders:
            dashboard?.upcoming_reminders ?? [],

        recentActivity:
            dashboard?.recent_activity ?? [],

        systemHealth:
            dashboard?.system_health ?? null,

        criticalCount:
            dashboard?.critical_count ?? 0,

        complianceItems,

        // Dashboard API state
        dashboardLoading,
        dashboardError,

        // Compliance API state
        complianceLoading,
        complianceError,

        // Keep these for existing components
        loading:
            dashboardLoading || complianceLoading,

        error:
            dashboardError || complianceError,

        refresh,

    };   


    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {

    const context =
        useContext(DashboardContext);

    if (!context) {

        throw new Error(
            "useDashboard must be used within DashboardProvider"
        );

    }

    return context;
}