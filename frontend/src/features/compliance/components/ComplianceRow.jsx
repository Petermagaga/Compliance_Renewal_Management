import StatusBadge from "./badges/StatusBadge";
import PriorityBadge from "./badges/PriorityBadge";
import ActionButtons from "./ActionButtons";

function ComplianceRow({
    item,
    onDelete,
}) {

    const overdue = item.days_remaining < 0;

    return (

        <tr
            className="
                border-b
                transition
                hover:bg-brand-light/30
            "
        >

            {/* Name */}

            <td className="px-6 py-4">

                <div>

                    <p className="font-semibold text-gray-900">
                        {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                        {item.company_name}
                    </p>

                </div>

            </td>

            {/* Category */}

            <td className="px-6 py-4">

                <span className="capitalize">
                    {item.category}
                </span>

            </td>

            {/* Department */}

            <td className="px-6 py-4">

                {item.department_name}

            </td>

            {/* Expiry */}

            <td className="px-6 py-4">

                <div>

                    <p>{item.expiry_date}</p>

                    <p
                        className={`
                            text-xs
                            ${
                                overdue
                                    ? "text-red-600"
                                    : "text-gray-500"
                            }
                        `}
                    >
                        {overdue
                            ? `${Math.abs(item.days_remaining)} days overdue`
                            : `${item.days_remaining} days left`}
                    </p>

                </div>

            </td>

            {/* Status */}

            <td className="px-6 py-4">

                <StatusBadge
                    status={item.status}
                />

            </td>

            {/* Priority */}

            <td className="px-6 py-4">

                <PriorityBadge
                    priority={item.priority}
                />

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