import { useEffect, useState } from "react";
import dashboardService from "../features/dashboard/services/dashboardService";
import StatusPieChart from "../components/charts/StatusPieChart";
function Reports() {
    const [summary, setSummary] = useState({
        total_items: 0,
        active: 0,
        expiring: 0,
        expired: 0,
    });
    const [statusDistribution,setStatusDistribution]=useState([]);
    useEffect(() => {
        const fetchReportSummary = async () => {
            try {
                const response = await dashboardService.getDashboard();

                setSummary(
                    response.data?.summary ?? {
                        total_items: 0,
                        active: 0,
                        expiring: 0,
                        expired: 0,
                    }
                );
                setStatusDistribution(
                    response.data?.charts?.status_distribution ?? []
                );
            } catch (error) {
                console.error(
                    "Report summary loading failed:",
                    error
                );
            }
        };

        fetchReportSummary();
    }, []);
   
   
    return (
        <div className="space-y-6 p-8">

            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Compliance Reports
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Overview of compliance status, expiry activity,
                    renewals, reminders, and audit activity.
                </p>
            </div>


            {/* KPI Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Total Compliance Items
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {summary.total_items}
                    </p>
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Active
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {summary.active}
                    </p>
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Expiring
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {summary.expiring}
                    </p>
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Expired
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {summary.expired}
                    </p>
                </div>

            </div>


            {/* Report Sections */}
            <div className="grid gap-6 lg:grid-cols-2">

                {/* Compliance Status */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <StatusPieChart data={statusDistribution} />

                </div>


                {/* Expiry Analysis */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Expiry Analysis
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Overview of upcoming and past expirations.
                    </p>

                    <div className="mt-8 flex h-48 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                        Expiry chart coming next
                    </div>

                </div>

            </div>


            {/* Renewal History */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Renewal History
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Historical record of compliance renewals.
                    </p>
                </div>

                <div className="mt-6 overflow-x-auto">

                    <table className="w-full text-left text-sm">

                        <thead className="border-b border-slate-200 text-slate-500">

                            <tr>
                                <th className="px-4 py-3 font-medium">
                                    Compliance Item
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Previous Expiry
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    New Expiry
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Renewed By
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Date
                                </th>
                            </tr>

                        </thead>


                        <tbody>

                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-4 py-8 text-center text-slate-400"
                                >
                                    Renewal history will appear here.
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Activity Reports */}
            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Reminder Activity
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Email and WhatsApp reminder activity.
                    </p>

                    <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                        Reminder report coming next
                    </div>

                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Audit Activity
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Recent compliance system activity.
                    </p>

                    <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                        Audit report coming next
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Reports;