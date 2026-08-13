import {
    FiCalendar,
    FiUser,
    FiBriefcase,
    FiAlertCircle,
} from "react-icons/fi";


function getPriorityStyles(priority) {

    switch (priority?.toLowerCase()) {

        case "critical":
            return {
                badge:
                    "bg-red-50 text-red-700 border-red-200",
                icon:
                    "text-red-600",
            };

        case "high":
            return {
                badge:
                    "bg-orange-50 text-orange-700 border-orange-200",
                icon:
                    "text-orange-600",
            };

        case "medium":
            return {
                badge:
                    "bg-amber-50 text-amber-700 border-amber-200",
                icon:
                    "text-amber-600",
            };

        default:
            return {
                badge:
                    "bg-slate-50 text-slate-600 border-slate-200",
                icon:
                    "text-slate-500",
            };
    }
}


function formatExpiryDate(date) {

    if (!date) return "—";

    return new Date(date).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}


function ReminderCard({ reminder }) {

    const styles =
        getPriorityStyles(reminder.priority);

    const isOverdue =
        reminder.days_remaining < 0;


    return (

        <article
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:shadow-md
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Main information */}

                <div className="min-w-0">

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >

                        <h3
                            className="
                                text-base
                                font-semibold
                                text-slate-900
                            "
                        >
                            {reminder.name}
                        </h3>

                        <span
                            className={`
                                inline-flex
                                items-center
                                rounded-full
                                border
                                px-2.5
                                py-1
                                text-xs
                                font-semibold
                                ${styles.badge}
                            `}
                        >
                            {reminder.priority}
                        </span>

                    </div>


                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            gap-x-5
                            gap-y-2
                            text-sm
                            text-slate-500
                        "
                    >

                        <span className="flex items-center gap-1.5">

                            <FiBriefcase
                                size={15}
                            />

                            {reminder.category}

                        </span>


                        <span className="flex items-center gap-1.5">

                            <FiUser
                                size={15}
                            />

                            {reminder.responsible_person || "Unassigned"}

                        </span>


                        <span className="flex items-center gap-1.5">

                            <FiCalendar
                                size={15}
                            />

                            {formatExpiryDate(
                                reminder.expiry_date
                            )}

                        </span>

                    </div>


                    <p
                        className="
                            mt-2
                            text-xs
                            text-slate-400
                        "
                    >
                        Department:{" "}
                        {reminder.department || "—"}
                    </p>

                </div>


                {/* Days remaining */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-3
                        lg:flex-col
                        lg:items-end
                    "
                >

                    <FiAlertCircle
                        size={20}
                        className={styles.icon}
                    />

                    <div className="text-right">

                        <p
                            className={`
                                text-sm
                                font-semibold
                                ${
                                    isOverdue
                                        ? "text-red-600"
                                        : "text-slate-800"
                                }
                            `}
                        >

                            {isOverdue
                                ? `${Math.abs(
                                    reminder.days_remaining
                                )} days overdue`
                                : `${reminder.days_remaining} days remaining`
                            }

                        </p>

                    </div>

                </div>

            </div>

        </article>

    );
}

export default ReminderCard;