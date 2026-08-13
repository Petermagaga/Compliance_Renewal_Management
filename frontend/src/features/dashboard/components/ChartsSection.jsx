import { useDashboard } from "../hooks/useDashboard";

import StatusPieChart from "../../../components/charts/StatusPieChart";
import ExpiryBarChart from "../../../components/charts/ExpiryBarChart";

import ChartSkeleton from "./ChartSkeleton";
import EmptyCharts from "./EmptyCharts";

function ChartsSection() {

    const {
        charts,
        loading,
    } = useDashboard();


    // Loading
    if (loading && !charts) {
        return <ChartSkeleton />;
    }


    // No chart object
    if (!charts) {
        return <EmptyCharts />;
    }


    const statusData =
        charts.status_distribution ?? [];

    const expiryData =
        charts.monthly_expiry_trend ?? [];


    // Chart object exists but contains no usable data
    const hasChartData =
        statusData.length > 0 ||
        expiryData.length > 0;


    if (!hasChartData) {
        return <EmptyCharts />;
    }


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
                    <div
                        className="
                            flex
                            h-[300px]
                            items-center
                            justify-center
                            text-sm
                            text-slate-400
                        "
                    >
                        No status data available.
                    </div>
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
                    <div
                        className="
                            flex
                            h-[300px]
                            items-center
                            justify-center
                            text-sm
                            text-slate-400
                        "
                    >
                        No expiry data available.
                    </div>
                )}

            </div>

        </div>
    );
}

export default ChartsSection;