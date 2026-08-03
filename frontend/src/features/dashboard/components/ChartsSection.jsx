import {useDashboard} from "../hooks/useDashboard";
import ExpiryBarChart from "../../../components/charts/ExpiryBarChart"
import StatusPieChart from "../../../components/charts/StatusPieChart"

function ChartsSection(){

    const { charts, loading } = useDashboard();

    if (loading) return <ChartSkeleton />;

    if (!charts)
        return <EmptyCharts />;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <StatusPieChart
                data={charts.status_distribution}
            />

            <ExpiryBarChart
                data={charts.monthly_expiry_trend}
            />
        </div>
    );

}

export default ChartsSection;