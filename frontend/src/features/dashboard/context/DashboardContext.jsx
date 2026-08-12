import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import dashboardService from "../services/dashboardService";
import complianceService from "../services/complianceService";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {

    const [dashboard, setDashboard] = useState(null);

    const [complianceItems, setComplianceItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchDashboard = async () => {

        try {

            setLoading(true);
            setError(null);

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

            console.log(
                "CHARTS FROM CONTEXT:",
                dashboardData?.charts
            );

            const complianceResponse =
                await complianceService.getItems();

            console.log(
                "Compliance API response:",
                complianceResponse
            );

            const complianceData =
                complianceResponse.data;

            // Support both:
            // [...]
            // and { results: [...] }

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
                "Dashboard loading failed:",
                err
            );

            setError(err);

        } finally {

            setLoading(false);

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

    const context =
        useContext(DashboardContext);

    if (!context) {

        throw new Error(
            "useDashboard must be used within DashboardProvider"
        );

    }

    return context;
}