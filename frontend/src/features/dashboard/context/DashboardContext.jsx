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

    // --------------------------------------------------
    // Dashboard state
    // --------------------------------------------------

    const [dashboard, setDashboard] = useState(null);

    const [dashboardLoading, setDashboardLoading] =
        useState(true);

    const [dashboardError, setDashboardError] =
        useState(null);


    // --------------------------------------------------
    // Compliance state
    // --------------------------------------------------

    const [complianceItems, setComplianceItems] =
        useState([]);

    const [complianceLoading, setComplianceLoading] =
        useState(true);

    const [complianceError, setComplianceError] =
        useState(null);


    // --------------------------------------------------
    // Fetch dashboard
    // --------------------------------------------------

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
                response.data;

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
    };


    // --------------------------------------------------
    // Fetch compliance items
    // --------------------------------------------------

    const fetchComplianceItems = async () => {

        setComplianceLoading(true);
        setComplianceError(null);

        try {

            const response =
                await complianceService.getItems();

            console.log(
                "Compliance API response:",
                response
            );

            const complianceData =
                response.data;

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


    // --------------------------------------------------
    // Fetch everything
    // --------------------------------------------------

    const fetchDashboardData = async () => {

        await Promise.all([
            fetchDashboard(),
            fetchComplianceItems(),
        ]);

    };


    // --------------------------------------------------
    // Refresh
    // --------------------------------------------------

    const refresh = async () => {

        await fetchDashboardData();

    };


    // --------------------------------------------------
    // Initial load
    // --------------------------------------------------

    useEffect(() => {

        fetchDashboardData();

    }, []);


    // --------------------------------------------------
    // Context value
    // --------------------------------------------------

    const value = {

        // Dashboard
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


        // Compliance
        complianceItems,


        // Separate loading states
        dashboardLoading,

        complianceLoading,


        // Separate errors
        dashboardError,

        complianceError,


        // Backward compatibility
        loading:
            dashboardLoading ||
            complianceLoading,

        error:
            dashboardError ||
            complianceError,


        // Actions
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