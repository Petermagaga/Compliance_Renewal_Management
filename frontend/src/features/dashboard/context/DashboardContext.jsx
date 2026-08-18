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


            /*
             * dashboardService already returns the API body:
             *
             * {
             *     success: true,
             *     message: "Dashboard loaded successfully",
             *     data: {
             *         summary: {...},
             *         charts: {...},
             *         upcoming_reminders: [...],
             *         recent_activity: [...],
             *         system_health: {...}
             *     }
             * }
             */


            const dashboardData =
                response?.data ?? null;


            console.log(
                "Normalized dashboard data:",
                dashboardData
            );


            setDashboard(
                dashboardData
            );

        } catch (err) {

            console.error(
                "Dashboard API failed:",
                err
            );

            setDashboardError(err);

            setDashboard(null);

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


            /*
             * complianceService already returns:
             *
             * {
             *     count: 7,
             *     next: null,
             *     previous: null,
             *     results: [...]
             * }
             */


            const payload =
                response ?? null;


            console.log(
                "Compliance payload:",
                payload
            );


            const items =
                Array.isArray(payload)
                    ? payload
                    : Array.isArray(payload?.results)
                        ? payload.results
                        : [];


            console.log(
                "Normalized compliance items:",
                items
            );


            setComplianceItems(
                items
            );

        } catch (err) {

            console.error(
                "Compliance API failed:",
                err
            );

            setComplianceError(err);

            setComplianceItems([]);

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

        // ------------------------------------------------
        // Dashboard
        // ------------------------------------------------

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


        // ------------------------------------------------
        // Compliance
        // ------------------------------------------------

        complianceItems,


        // ------------------------------------------------
        // Loading
        // ------------------------------------------------

        dashboardLoading,

        complianceLoading,


        // ------------------------------------------------
        // Errors
        // ------------------------------------------------

        dashboardError,

        complianceError,


        // ------------------------------------------------
        // Backward compatibility
        // ------------------------------------------------

        loading:
            dashboardLoading ||
            complianceLoading,

        error:
            dashboardError ||
            complianceError,


        // ------------------------------------------------
        // Actions
        // ------------------------------------------------

        refresh,

    };


    return (

        <DashboardContext.Provider value={value}>

            {children}

        </DashboardContext.Provider>

    );
}


// ------------------------------------------------------
// useDashboard
// ------------------------------------------------------

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