import { Link } from "react-router-dom";
import {
    FiArrowLeft,
    FiEdit2,
    FiCalendar,
    FiBriefcase,
} from "react-icons/fi";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function DetailHeader({ item }) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
            "
        >

            {/* Back */}

            <Link
                to="/compliance"
                className="
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-brand-green
                    hover:underline
                "
            >
                <FiArrowLeft />
                Back to Compliance
            </Link>

            <div
                className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="space-y-4">

                    <div className="flex flex-wrap items-center gap-3">

                        <h1 className="text-3xl font-bold text-gray-900">
                            {item.name}
                        </h1>

                        <StatusBadge status={item.status} />

                        <PriorityBadge priority={item.priority} />

                    </div>

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-5
                            text-sm
                            text-gray-500
                        "
                    >

                        <span className="flex items-center gap-2">

                            <FiBriefcase />

                            {item.category}

                        </span>

                        {item.department_name && (

                            <span>

                                Department:
                                <strong className="ml-1 text-gray-700">

                                    {item.department_name}

                                </strong>

                            </span>

                        )}

                        {item.company_name && (

                            <span>

                                Company:
                                <strong className="ml-1 text-gray-700">

                                    {item.company_name}

                                </strong>

                            </span>

                        )}

                        <span className="flex items-center gap-2">

                            <FiCalendar />

                            Expires {item.expiry_date}

                        </span>


                        {item.is_overdue ? (

                            <p className="text-sm font-semibold text-red-600">
                                Overdue by {Math.abs(item.days_remaining)} days
                            </p>

                        ) : (

                            <p className="text-sm font-semibold text-amber-600">
                                {item.days_remaining} days remaining
                            </p>

                        )}

                    </div>

                </div>

                {/* Actions */}

                <div className="flex gap-3">

                    <Link
                        to={`/compliance/${item.id}/edit`}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-brand-green
                            px-5
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >

                        <FiEdit2 />

                        Edit Compliance

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default DetailHeader;