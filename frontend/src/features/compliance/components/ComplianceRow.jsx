import StatusBadge from "./badges/StatusBadge";
import PriorityBadge from "./badges/PriorityBadge";
import ActionButtons from "./ActionButtons";

function formatExpiryDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function ComplianceRow({ item, onDelete }) {

    const daysRemaining = Number(item.days_remaining ?? 0);
    const overdue = daysRemaining < 0;
    const urgent = daysRemaining >= 0 && daysRemaining <= 7;

    return (
        <tr
            className="
                border-b
                border-slate-100
                transition
                hover:bg-slate-50
            "
        >

            {/* Compliance */}

            <td className="px-6 py-4">

                <div className="min-w-[180px]">

                    <p className="font-semibold text-slate-900">
                        {item.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        {item.company_name || "OpenComply"}
                    </p>

                </div>

            </td>


            {/* Category */}

            <td className="px-6 py-4">

                <span
                    className="
                        inline-flex
                        rounded-md
                        bg-slate-100
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        capitalize
                        text-slate-600
                    "
                >
                    {item.category || "—"}
                </span>

            </td>


            {/* Department */}

            <td className="px-6 py-4">

                <span className="whitespace-nowrap text-sm text-slate-600">
                    {item.department_name || "—"}
                </span>

            </td>


            {/* Expiry */}

            <td className="px-6 py-4">

                <div className="min-w-[130px]">

                    <p className="text-sm font-medium text-slate-800">
                        {formatExpiryDate(item.expiry_date)}
                    </p>

                    <p
                        className={`
                            mt-1
                            text-xs
                            font-medium
                            ${
                                overdue
                                    ? "text-red-600"
                                    : urgent
                                    ? "text-amber-600"
                                    : "text-slate-400"
                            }
                        `}
                    >
                        {overdue
                            ? `${Math.abs(daysRemaining)} days overdue`
                            : `${daysRemaining} days left`
                        }
                    </p>

                </div>

            </td>


            {/* Status */}

            <td className="px-6 py-4">

                <StatusBadge status={item.status} />

            </td>


            {/* Priority */}

            <td className="px-6 py-4">

                <PriorityBadge priority={item.priority} />

            </td>


            {/* Actions */}

            <td className="px-6 py-4 text-right">

                <ActionButtons
                    item={item}
                    onDelete={onDelete}
                />

            </td>

        </tr>
    );
}

export default ComplianceRow;