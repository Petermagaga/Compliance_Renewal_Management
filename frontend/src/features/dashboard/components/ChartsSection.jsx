import { useDashboard } from "../hooks/useDashboard";

import StatusPieChart from "../../../components/charts/StatusPieChart";
import ExpiryBarChart from "../../../components/charts/ExpiryBarChart";

import ChartSkeleton from "./ChartSkeleton";
import EmptyCharts from "./EmptyCharts";
import DashboardErrorState from "./DashboardErrorState";

function ChartsSection() {
    const {
        charts,
        loading,
        error,
        refresh,
    } = useDashboard();

    // -------------------------
    // Loading
    // -------------------------

    if (loading) {
        return <ChartSkeleton />;
    }

    // -------------------------
    // Error
    // -------------------------

    
    if (error) {
        return (
            <DashboardErrorState
                title="Unable to load charts"
                message="We couldn't retrieve the compliance analytics."
                onRetry={refresh}
            />
        );
    }

    // -------------------------
    // No chart object
    // -------------------------

    if (!charts) {
        return <EmptyCharts />;
    }

    const statusData =
        charts.status_distribution ?? [];

    const expiryData =
        charts.expiry_ranges ?? [];

    // -------------------------
    // Empty chart data
    // -------------------------

    if (
        statusData.length === 0 &&
        expiryData.length === 0
    ) {
        return <EmptyCharts />;
    }

    // -------------------------
    // Render charts
    // -------------------------

    return (
        <div
            className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
            "
        >

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                "
            >
                {statusData.length > 0 ? (
                    <StatusPieChart
                        data={statusData}
                    />
                ) : (
                    <EmptyCharts
                        title="No status data yet"
                        description="Status analytics will appear once compliance items are added."
                    />
                )}
            </div>

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                "
            >
                {expiryData.length > 0 ? (
                    <ExpiryBarChart
                        data={expiryData}
                    />
                ) : (
                    <EmptyCharts
                        title="No expiry data yet"
                        description="Expiry trends will appear once compliance records are available."
                    />
                )}
            </div>

        </div>
    );
}

export default ChartsSection;