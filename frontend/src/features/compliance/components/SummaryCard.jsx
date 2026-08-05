import {
    FiActivity,
    FiFlag,
    FiClock,
    FiUser,
} from "react-icons/fi";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./badges/PriorityBadge";

function SummaryCard({ item }) {

    const daysRemaining = item.days_remaining ?? 0;

    const overdue = item.is_overdue;

    const cards = [

        {
            title: "Status",
            icon: <FiActivity />,
            value: <StatusBadge status={item.status} />,
        },

        {
            title: "Priority",
            icon: <FiFlag />,
            value: <PriorityBadge priority={item.priority} />,
        },

        {
            title: "Days Remaining",
            icon: <FiClock />,
            value: overdue ? (
                <span className="font-semibold text-red-600">
                    Overdue by {Math.abs(daysRemaining)} days
                </span>
            ) : (
                <span className="font-semibold text-amber-600">
                    {daysRemaining} days
                </span>
            ),
        },

        {
            title: "Responsible",
            icon: <FiUser />,
            value: (
                <span className="font-semibold text-gray-900">
                    {item.responsible_person_name ||
                        item.responsible_person ||
                        "Not Assigned"}
                </span>
            ),
        },

    ];

    return (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-md
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-brand-green/10
                                text-brand-green
                            "
                        >
                            {card.icon}
                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                {card.title}
                            </p>

                            <div className="mt-2">
                                {card.value}
                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default SummaryCard;