import { useEffect, useState } from "react";
import dashboardService from "../features/dashboard/services/dashboardService";
import complianceService from "../features/compliance/services/complianceService";
import StatusPieChart from "../components/charts/StatusPieChart";
function Reports() {
    const [summary, setSummary] = useState({
        total_items: 0,
        active: 0,
        expiring: 0,
        expired: 0,
    });
    const [statusDistribution,setStatusDistribution]=useState([]);
    const[expiryRanges,setExpiryRanges] =useState([]);
    const[renewals,setRenewals] =useState([]);
    const[reminders,setReminders]=useState([]);
    const []=useState()
    const totalItems = summary.total_items || 0;

    const totalReminders = reminders.length;

    const sentReminders = reminders.filter(
        (reminder) => reminder.status === "sent"
    ).length;

    const failedReminders = reminders.filter(
        (reminder) => reminder.status === "failed"
    ).length;

    const emailReminders = reminders.filter(
        (reminder) => reminder.channel === "email"
    ).length;

    const whatsappReminders = reminders.filter(
        (reminder) => reminder.channel === "whatsapp"
    ).length;


    const statusPercentages = statusDistribution.map((status) => ({
        ...status,
        percentage: totalItems
            ? Math.round((status.value / totalItems) * 100)
            : 0,
    }));


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

                setExpiryRanges(
                    response.data?.charts?.expiry_ranges ??[]
                );

                const renewalResponse = await complianceService.getAllRenewals();

                setRenewals(
                    renewalResponse.data ?? []
                );

                const reminderResponse = await complianceService.getAllReminders();

                setReminders(
                    reminderResponse.data ?? []
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
                
                <div>
                    <StatusPieChart data={statusDistribution} />

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        {statusPercentages.map((status) => (
                            <div
                                key={status.name}
                                className="rounded-xl bg-slate-50 p-4 text-center"
                            >
                                <p className="text-xs font-medium text-slate-500">
                                    {status.name}
                                </p>

                                <p className="mt-1 text-xl font-bold text-slate-900">
                                    {status.percentage}%
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    {status.value} item
                                    {status.value === 1 ? "" : "s"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Expiry Analysis */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Expiry Analysis
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Overview of upcoming and past expirations.
                    </p>

                <div className="mt-8 space-y-4">
                    {expiryRanges.map((range) => (
                        <div key={range.range}>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    {range.range} days
                                </span>

                                <span className="text-sm font-semibold text-slate-900">
                                    {range.items}
                                </span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-green-600"
                                    style={{
                                        width: `${
                                            summary.total_items
                                                ? (range.items / summary.total_items) * 100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                </div>

            </div>


            {/* Renewal History */}

            <div className="mt-6 overflow-x-auto">
                {renewals.length === 0 ? (
                    <div className="flex h-24 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                        No renewal history available.
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs text-slate-500">
                                <th className="px-3 py-3 font-medium">
                                    Compliance Item
                                </th>

                                <th className="px-3 py-3 font-medium">
                                    Previous Expiry
                                </th>

                                <th className="px-3 py-3 font-medium">
                                    New Expiry
                                </th>

                                <th className="px-3 py-3 font-medium">
                                    Renewed By
                                </th>

                                <th className="px-3 py-3 font-medium">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {renewals.map((renewal) => (
                                <tr
                                    key={renewal.id}
                                    className="border-b border-slate-100 last:border-0"
                                >
                                    <td className="px-3 py-4 text-sm font-medium text-slate-900">
                                        {renewal.compliance_item_name}
                                    </td>

                                    <td className="px-3 py-4 text-sm text-slate-600">
                                        {renewal.old_expiry_date}
                                    </td>

                                    <td className="px-3 py-4 text-sm text-slate-600">
                                        {renewal.new_expiry_date}
                                    </td>

                                    <td className="px-3 py-4 text-sm text-slate-600">
                                        {renewal.renewed_by_name || "System"}
                                    </td>

                                    <td className="px-3 py-4 text-sm text-slate-600">
                                        {new Date(
                                            renewal.renewed_at
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
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