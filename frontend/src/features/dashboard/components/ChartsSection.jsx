import { useDashboard } from "../hooks/useDashboard";

import StatusPieChart from "../../../components/charts/StatusPieChart";
import ExpiryBarChart from "../../../components/charts/ExpiryBarChart";

import ChartSkeleton from "./ChartSkeleton";
import EmptyCharts from "./EmptyCharts";

function ChartsSection() {
    const { charts, loading } = useDashboard();

    if (loading) return <ChartSkeleton />;

    if (!charts) return <EmptyCharts />;

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

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
                <StatusPieChart
                    data={charts.status_distribution}
                />
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
                <ExpiryBarChart
                    data={charts.monthly_expiry_trend}
                />
            </div>

        </div>
    );
}

export default ChartsSection;