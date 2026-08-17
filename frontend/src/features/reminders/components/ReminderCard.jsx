import {
    FiCalendar,
    FiUser,
    FiBriefcase,
    FiAlertCircle,
    FiArrowRight,
} from "react-icons/fi";

function getPriorityStyles(priority) {

    switch (priority?.toLowerCase()) {

        case "critical":
            return {
                badge: "bg-red-50 text-red-700 border-red-200",
                icon: "text-red-600",
                accent: "border-l-red-500",
            };

        case "high":
            return {
                badge: "bg-orange-50 text-orange-700 border-orange-200",
                icon: "text-orange-600",
                accent: "border-l-orange-500",
            };

        case "medium":
            return {
                badge: "bg-amber-50 text-amber-700 border-amber-200",
                icon: "text-amber-600",
                accent: "border-l-amber-400",
            };

        default:
            return {
                badge: "bg-slate-50 text-slate-600 border-slate-200",
                icon: "text-slate-500",
                accent: "border-l-slate-300",
            };
    }
}


function formatExpiryDate(date) {

    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}


function ReminderCard({ reminder }) {

    const styles = getPriorityStyles(reminder.priority);

    const daysRemaining = Number(
        reminder.days_remaining ?? 0
    );

    const isOverdue = daysRemaining < 0;

    const isUrgent =
        !isOverdue &&
        daysRemaining <= 7;


    return (

        <article
            className={`
                group
                border-l-4
                ${styles.accent}
                border-y
                border-r
                border-slate-200
                bg-white
                px-5
                py-4
                transition
                duration-200
                hover:bg-slate-50
            `}
        >

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Main information */}

                <div className="min-w-0 flex-1">

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                        "
                    >

                        <h3
                            className="
                                text-sm
                                font-semibold
                                text-slate-900
                            "
                        >
                            {reminder.name}
                        </h3>

                        <span
                            className={`
                                inline-flex
                                rounded-full
                                border
                                px-2
                                py-0.5
                                text-[11px]
                                font-semibold
                                ${styles.badge}
                            `}
                        >
                            {reminder.priority}
                        </span>

                    </div>


                    <div
                        className="
                            mt-2
                            flex
                            flex-wrap
                            gap-x-5
                            gap-y-2
                            text-xs
                            text-slate-500
                        "
                    >

                        <span className="flex items-center gap-1.5">

                            <FiBriefcase size={13} />

                            <span className="capitalize">
                                {reminder.category}
                            </span>

                        </span>


                        <span className="flex items-center gap-1.5">

                            <FiUser size={13} />

                            {reminder.responsible_person || "Unassigned"}

                        </span>


                        <span className="flex items-center gap-1.5">

                            <FiCalendar size={13} />

                            {formatExpiryDate(
                                reminder.expiry_date
                            )}

                        </span>

                    </div>


                    <p
                        className="
                            mt-2
                            text-[11px]
                            text-slate-400
                        "
                    >
                        {reminder.department || "No department assigned"}
                    </p>

                </div>


                {/* Urgency */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        lg:justify-end
                    "
                >

                    <div className="flex items-center gap-2">

                        <FiAlertCircle
                            size={17}
                            className={styles.icon}
                        />

                        <div>

                            <p
                                className={`
                                    text-sm
                                    font-semibold
                                    ${
                                        isOverdue
                                            ? "text-red-600"
                                            : isUrgent
                                            ? "text-amber-600"
                                            : "text-slate-800"
                                    }
                                `}
                            >
                                {isOverdue
                                    ? `${Math.abs(daysRemaining)} days overdue`
                                    : `${daysRemaining} days remaining`
                                }
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="
                            inline-flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            text-slate-400
                            transition
                            group-hover:text-brand-green
                        "
                    >
                        Review

                        <FiArrowRight
                            size={14}
                        />

                    </button>

                </div>

            </div>

        </article>
    );
}

export default ReminderCard;