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

    // ---------------------------------------
    // Dashboard state
    // ---------------------------------------

    const [dashboard, setDashboard] = useState(null);

    const [dashboardLoading, setDashboardLoading] =
        useState(true);

    const [dashboardError, setDashboardError] =
        useState(null);


    // ---------------------------------------
    // Compliance state
    // ---------------------------------------

    const [complianceItems, setComplianceItems] =
        useState([]);

    const [complianceLoading, setComplianceLoading] =
        useState(true);

    const [complianceError, setComplianceError] =
        useState(null);


    // ---------------------------------------
    // Fetch dashboard + compliance
    // ---------------------------------------

    const fetchDashboard = async () => {

        // ================================
        // Dashboard API
        // ================================

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


        // ================================
        // Compliance API
        // ================================

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


    // ---------------------------------------
    // Refresh
    // ---------------------------------------

    const refresh = async () => {

        await fetchDashboard();

    };


    // ---------------------------------------
    // Initial load
    // ---------------------------------------

    useEffect(() => {

        fetchDashboard();

    }, []);


    // ---------------------------------------
    // Context value
    // ---------------------------------------

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


        // Specific loading states
        dashboardLoading,

        complianceLoading,


        // Specific errors
        dashboardError,

        complianceError,


        // Backwards compatibility
        //
        // Existing components still using
        // `loading` and `error` won't break.

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

        <DashboardContext.Provider
            value={value}
        >

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


export default DashboardContext;