import { useDashboard } from "../hooks/useDashboard";

import StatusPieChart from "../../../components/charts/StatusPieChart";
import ExpiryBarChart from "../../../components/charts/ExpiryBarChart";

import ChartSkeleton from "./ChartSkeleton";
import EmptyCharts from "./EmptyCharts";

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
            <div
                className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-white
                    p-8
                    text-center
                    shadow-sm
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-red-50
                        text-red-500
                    "
                >
                    !
                </div>

                <h3
                    className="
                        mt-4
                        text-base
                        font-semibold
                        text-slate-900
                    "
                >
                    Unable to load analytics
                </h3>

                <p
                    className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        text-slate-500
                    "
                >
                    We couldn't load your compliance charts.
                    Please try again.
                </p>

                <button
                    type="button"
                    onClick={refresh}
                    className="
                        mt-5
                        rounded-lg
                        bg-brand-green
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:brightness-95
                    "
                >
                    Try Again
                </button>
            </div>
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
        charts.monthly_expiry_trend ?? [];

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