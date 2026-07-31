import {useDashboard} from "../hooks/useDashboard";
import ExpiryBarChart from "../../../components/charts/ExpiryBarChart"
import StatusPieChart from "../../../components/charts/StatusPieChart"

function ChartsSection(){


    const { dashboard, loading } = useDashboard();

    if (loading) {
        return <div>Loading charts...</div>;
    }

    const charts = dashboard?.data?.charts;

    if (!charts) {
        return <div>No chart data available.</div>;
    }

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


    return(

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