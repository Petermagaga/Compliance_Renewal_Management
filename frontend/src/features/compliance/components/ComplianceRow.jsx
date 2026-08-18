import StatusBadge from "./badges/StatusBadge";
import PriorityBadge from "./badges/PriorityBadge";
import ActionButtons from "./ActionButtons";

function ComplianceRow({
    item,
    onDelete,
}) {

    const department =
        item.department_name ??
        item.department ??
        "—";

    const expiryDate =
        item.expiry_date ??
        item.expiry ??
        "—";

    const daysRemaining =
        item.days_remaining ??
        item.daysLeft ??
        null;

    const overdue =
        typeof daysRemaining === "number" &&
        daysRemaining < 0;


    return (
        <tr
            className="
                border-b
                border-slate-100
                transition
                hover:bg-slate-50
            "
        >

            {/* Item */}

            <td className="px-4 py-4">

                <div>

                    <p className="font-semibold text-slate-900">
                        {item.name ?? "Unnamed item"}
                    </p>

                    {item.company_name && (
                        <p className="mt-1 text-xs text-slate-500">
                            {item.company_name}
                        </p>
                    )}

                </div>

            </td>


            {/* Category */}

            <td className="px-4 py-4">

                <span className="capitalize text-slate-700">
                    {item.category ?? "—"}
                </span>

            </td>


            {/* Department */}

            <td className="px-4 py-4 text-slate-700">
                {department}
            </td>


            {/* Expiry */}

            <td className="px-4 py-4">

                <div>

                    <p className="text-slate-800">
                        {expiryDate}
                    </p>

                    {daysRemaining !== null && (
                        <p
                            className={`
                                mt-1
                                text-xs
                                ${
                                    overdue
                                        ? "text-red-600"
                                        : "text-slate-500"
                                }
                            `}
                        >
                            {overdue
                                ? `${Math.abs(daysRemaining)} days overdue`
                                : `${daysRemaining} days left`
                            }
                        </p>
                    )}

                </div>

            </td>


            {/* Days */}

            <td className="px-4 py-4">

                <span
                    className={`
                        text-sm
                        font-medium
                        ${
                            overdue
                                ? "text-red-600"
                                : "text-slate-700"
                        }
                    `}
                >
                    {daysRemaining !== null
                        ? daysRemaining
                        : "—"
                    }
                </span>

            </td>


            {/* Status */}

            <td className="px-4 py-4">

                <StatusBadge
                    status={item.status}
                />

            </td>


            {/* Priority */}

            <td className="px-4 py-4">

                <PriorityBadge
                    priority={item.priority}
                />

            </td>


            {/* Actions */}

            <td className="px-4 py-4 text-right">

                <ActionButtons
                    item={item}
                    onDelete={onDelete}
                />

            </td>

        </tr>
    );
}

export default ComplianceRow;