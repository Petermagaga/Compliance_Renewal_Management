import {
    FiBriefcase,
    FiCalendar,
    FiFolder,
    FiHash,
    FiUser,
} from "react-icons/fi";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./badges/PriorityBadge";

function DetailRow({
    icon,
    label,
    value,
}) {
    return (
        <div className="flex items-start justify-between py-3">

            <div className="flex items-center gap-3 text-gray-500">

                {icon}

                <span>{label}</span>

            </div>

            <div className="text-right font-medium text-gray-900">
                {value || "-"}
            </div>

        </div>
    );
}

function InformationCard({ item }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            {/* Header */}

            <div className="border-b px-6 py-5">

                <h2 className="text-xl font-semibold text-gray-900">
                    Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Complete compliance record details.
                </p>

            </div>

            <div className="space-y-8 p-6">

                {/* Business */}

                <section>

                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Business Information
                    </h3>

                    <DetailRow
                        icon={<FiBriefcase />}
                        label="Company"
                        value={item.company_name}
                    />

                    <DetailRow
                        icon={<FiFolder />}
                        label="Department"
                        value={item.department_name}
                    />

                    <DetailRow
                        icon={<FiFolder />}
                        label="Category"
                        value={item.category}
                    />

                    <DetailRow
                        icon={<FiUser />}
                        label="Responsible Person"
                        value={
                            item.responsible_person_name ||
                            item.responsible_person
                        }
                    />

                </section>

                {/* Compliance */}

                <section>

                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Compliance Details
                    </h3>

                    <DetailRow
                        icon={<FiCalendar />}
                        label="Issue Date"
                        value={item.issue_date}
                    />

                    <DetailRow
                        icon={<FiCalendar />}
                        label="Expiry Date"
                        value={item.expiry_date}
                    />

                    <DetailRow
                        icon={<FiHash />}
                        label="Status"
                        value={<StatusBadge status={item.status} />}
                    />

                    <DetailRow
                        icon={<FiHash />}
                        label="Priority"
                        value={<PriorityBadge priority={item.priority} />}
                    />

                </section>

                {/* System */}

                <section>

                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        System
                    </h3>

                    <DetailRow
                        icon={<FiHash />}
                        label="Record ID"
                        value={`#${item.id}`}
                    />

                    {item.created_at && (
                        <DetailRow
                            icon={<FiCalendar />}
                            label="Created"
                            value={new Date(item.created_at).toLocaleDateString()}
                        />
                    )}

                    {item.updated_at && (
                        <DetailRow
                            icon={<FiCalendar />}
                            label="Last Updated"
                            value={new Date(item.updated_at).toLocaleDateString()}
                        />
                    )}

                </section>

            </div>

        </div>

    );

}

export default InformationCard;