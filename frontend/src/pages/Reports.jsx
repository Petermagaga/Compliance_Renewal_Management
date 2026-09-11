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
    const [audit,setAudit] =useState([]);

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


    const totalAudit = audit.length;

    const createdAudit = audit.filter(
        (entry) => entry.activity_type === "created"
    ).length;

    const updatedAudit = audit.filter(
        (entry) => entry.activity_type === "updated"
    ).length;

    const renewedAudit = audit.filter(
        (entry) => entry.activity_type === "renewed"
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


                const auditResponse = await complianceService.getAllAudit();

                setAudit(
                    auditResponse.data ?? []
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

                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">
                                Total Reminders
                            </p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {totalReminders}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">
                                Sent
                            </p>
                            <p className="mt-2 text-2xl font-bold text-green-600">
                                {sentReminders}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">
                                Failed
                            </p>
                            <p className="mt-2 text-2xl font-bold text-red-500">
                                {failedReminders}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">
                                Email
                            </p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {emailReminders}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-500">
                                WhatsApp
                            </p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">
                                {whatsappReminders}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 overflow-x-auto">
                        {reminders.length === 0 ? (
                            <div className="flex h-24 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                                No reminder activity available.
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 text-xs text-slate-500">
                                        <th className="px-3 py-3 font-medium">
                                            Compliance Item
                                        </th>

                                        <th className="px-3 py-3 font-medium">
                                            Reminder
                                        </th>

                                        <th className="px-3 py-3 font-medium">
                                            Channel
                                        </th>

                                        <th className="px-3 py-3 font-medium">
                                            Status
                                        </th>

                                        <th className="px-3 py-3 font-medium">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reminders.map((reminder) => (
                                        <tr
                                            key={reminder.id}
                                            className="border-b border-slate-100 last:border-0"
                                        >
                                            <td className="px-3 py-4 text-sm font-medium text-slate-900">
                                                {reminder.compliance_item_name}
                                            </td>

                                            <td className="px-3 py-4 text-sm text-slate-600">
                                                {reminder.days_before} days before
                                            </td>

                                            <td className="px-3 py-4 text-sm capitalize text-slate-600">
                                                {reminder.channel}
                                            </td>

                                            <td className="px-3 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        reminder.status === "sent"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {reminder.status}
                                                </span>
                                            </td>

                                            <td className="px-3 py-4 text-sm text-slate-600">
                                                {new Date(
                                                    reminder.sent_at
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>


                </div>


            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Audit Activity
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Historical record of compliance actions and system activity.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-3">
                <div className="rounded-xl bg-slate-50 p-4 text-center">
                        <p className="text-xs font-medium text-slate-500">
                            Total Activity
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                            {totalAudit}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 text-center">
                        <p className="text-xs font-medium text-slate-500">
                            Created
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                            {createdAudit}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 text-center">
                        <p className="text-xs font-medium text-slate-500">
                            Updated
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                            {updatedAudit}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 text-center">
                        <p className="text-xs font-medium text-slate-500">
                            Renewed
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                            {renewedAudit}
                        </p>
                    </div>

                </div>

                <div className="mt-8 overflow-x-auto">
                    {audit.length === 0 ? (
                        <div className="flex h-24 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
                            No audit activity available.
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 text-xs text-slate-500">
                                    <th className="px-3 py-3 font-medium">
                                        Activity
                                    </th>

                                    <th className="px-3 py-3 font-medium">
                                        Compliance Item
                                    </th>

                                    <th className="px-3 py-3 font-medium">
                                        User
                                    </th>

                                    <th className="px-3 py-3 font-medium">
                                        Description
                                    </th>

                                    <th className="px-3 py-3 font-medium">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {audit.map((entry) => (
                                    <tr
                                        key={entry.id}
                                        className="border-b border-slate-100 last:border-0"
                                    >
                                        <td className="px-3 py-4">

                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    entry.activity_type === "created"
                                                        ? "bg-green-100 text-green-700"
                                                        : entry.activity_type === "updated"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : entry.activity_type === "renewed"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : entry.activity_type === "expired"
                                                        ? "bg-red-100 text-red-700"
                                                        : entry.activity_type === "email_sent" ||
                                                        entry.activity_type === "whatsapp_sent"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : entry.activity_type === "email_failed" ||
                                                        entry.activity_type === "whatsapp_failed"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-slate-100 text-slate-700"
                                                }`}
                                            >
                                                {entry.activity_type
                                                    .replace(/_/g, " ")
                                                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                                            </span>


                                        </td>

                                        <td className="px-3 py-4 text-sm font-medium text-slate-900">
                                            {entry.compliance_item_name || "System"}
                                        </td>

                                        <td className="px-3 py-4 text-sm text-slate-600">
                                            {entry.user_name || "System"}
                                        </td>

                                        <td className="max-w-md px-3 py-4 text-sm text-slate-600">
                                            {entry.description}
                                        </td>

                                        <td className="px-3 py-4 text-sm text-slate-600">
                                            {new Date(
                                                entry.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            </div>

        </div>
    );
}

export default Reports;