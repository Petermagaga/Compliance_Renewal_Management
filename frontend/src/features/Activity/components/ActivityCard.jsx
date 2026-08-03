import {
    FiMail,
    FiMessageCircle,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiCheckCircle,
    FiAlertTriangle,
} from "react-icons/fi";

function getIcon(type) {
    switch (type) {
        case "email_sent":
            return <FiMail size={18} />;

        case "whatsapp_sent":
            return <FiMessageCircle size={18} />;

        case "created":
            return <FiPlus size={18} />;

        case "updated":
            return <FiEdit2 size={18} />;

        case "deleted":
            return <FiTrash2 size={18} />;

        case "renewed":
            return <FiCheckCircle size={18} />;

        case "expired":
            return <FiAlertTriangle size={18} />;

        default:
            return <FiEdit2 size={18} />;
    }
}

function formatRelativeTime(timestamp) {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function ActivityItem({ activity }) {
    return (
        <div
            className="
                flex
                items-start
                gap-4
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                transition
                duration-300
                hover:border-green-400
                hover:bg-green-50
            "
        >
            {/* Green status dot */}
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0" />

            {/* Icon */}
            <div
                className="
                    flex
                    h-11
                    w-11
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-100
                    text-brand-green
                "
            >
                {getIcon(activity.activity_type || activity.type)}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                            {activity.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            {activity.description}
                        </p>

                        {activity.user_name && (
                            <p className="mt-2 text-xs text-gray-400">
                                by {activity.user_name}
                            </p>
                        )}
                    </div>

                    <time className="whitespace-nowrap text-xs text-gray-400">
                        {formatRelativeTime(
                            activity.created_at || activity.timestamp
                        )}
                    </time>
                </div>
            </div>
        </div>
    );
}

export default ActivityItem;