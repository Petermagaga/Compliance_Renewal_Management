import {
    FiCalendar,
    FiUser,
    FiBriefcase,
    FiAlertCircle,
    FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
;

function getPriorityStyles(priority) {
    
    const value = priority?.toLowerCase();
    

    if (value === "critical") {
        return {
            badge: "bg-red-50 text-red-700 border-red-200",
            icon: "text-red-600",
            border: "border-l-red-500",
        };
    }

    if (value === "high") {
        return {
            badge: "bg-orange-50 text-orange-700 border-orange-200",
            icon: "text-orange-600",
            border: "border-l-orange-500",
        };
    }

    if (value === "medium") {
        return {
            badge: "bg-amber-50 text-amber-700 border-amber-200",
            icon: "text-amber-600",
            border: "border-l-amber-400",
        };
    }

    return {
        badge: "bg-slate-50 text-slate-600 border-slate-200",
        icon: "text-slate-500",
        border: "border-l-slate-300",
    };
}


function formatDate(date) {

    if (!date) {
        return "—";
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return "—";
    }

    return parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}


function ReminderCard({ reminder }) {

    console.log(
        "REMINDER CARD RECEIVED:",
        reminder
    );


    if (!reminder) {
        return null;
    }


    const styles =
        getPriorityStyles(reminder.priority);


    const daysRemaining =
        Number(reminder.days_remaining);


    let urgencyText;
    let urgencyColor;


    if (daysRemaining < 0) {

        urgencyText =
            `${Math.abs(daysRemaining)} days overdue`;

        urgencyColor =
            "text-red-600";

    } else if (daysRemaining === 0) {

        urgencyText =
            "Expires today";

        urgencyColor =
            "text-red-600";

    } else {

        urgencyText =
            `${daysRemaining} days remaining`;

        urgencyColor =
            daysRemaining <= 7
                ? "text-amber-600"
                : "text-slate-700";
    }


    return (

        <article
            className={`
                w-full
                border
                border-slate-200
                border-l-4
                ${styles.border}
                rounded-xl
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
            `}
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

                {/* -------------------------------- */}
                {/* LEFT SIDE                         */}
                {/* -------------------------------- */}

                <div className="min-w-0 flex-1">

                    {/* Name + Priority */}

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
                                text-base
                                font-semibold
                                text-slate-900
                            "
                        >
                            {reminder.name}
                        </h3>


                        <span
                            className={`
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


                    {/* Details */}

                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            gap-x-6
                            gap-y-2
                            text-sm
                            text-slate-500
                        "
                    >

                        {/* Category */}

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                            "
                        >

                            <FiBriefcase size={14} />

                            <span className="capitalize">
                                {reminder.category}
                            </span>

                        </div>


                        {/* Responsible person */}

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                            "
                        >

                            <FiUser size={14} />

                            <span>
                                {reminder.responsible_person ||
                                    "Unassigned"}
                            </span>

                        </div>


                        {/* Expiry */}

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                            "
                        >

                            <FiCalendar size={14} />

                            <span>
                                {formatDate(
                                    reminder.expiry_date
                                )}
                            </span>

                        </div>

                    </div>


                    {/* Department */}

                    <p
                        className="
                            mt-2
                            text-xs
                            text-slate-400
                        "
                    >
                        Department:{" "}
                        {reminder.department ||
                            "Unassigned"}
                    </p>

                </div>


                {/* -------------------------------- */}
                {/* RIGHT SIDE                        */}
                {/* -------------------------------- */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        gap-6
                        lg:justify-end
                    "
                >

                    {/* Urgency */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <FiAlertCircle
                            size={18}
                            className={styles.icon}
                        />

                        <span
                            className={`
                                whitespace-nowrap
                                text-sm
                                font-semibold
                                ${urgencyColor}
                            `}
                        >
                            {urgencyText}
                        </span>

                    </div>


                    {/* Review */}

                    <Link
                        to={`/compliance/${reminder.id}`}
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

                        <FiArrowRight size={15} />
                    </Link>


                </div>

            </div>

        </article>
    );
}


export default ReminderCard;