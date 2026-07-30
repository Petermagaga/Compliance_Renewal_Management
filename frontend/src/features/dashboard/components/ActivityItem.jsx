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
            return <FiMail />;

        case "whatsapp_sent":
            return <FiMessageCircle />;

        case "created":
            return <FiPlus />;

        case "updated":
            return <FiEdit2 />;

        case "deleted":
            return <FiTrash2 />;

        case "renewed":
            return <FiCheckCircle />;

        case "expired":
            return <FiAlertTriangle />;

        default:
            return <FiEdit2 />;
    }
}

function formatRelativeTime(timestamp) {

    if (!timestamp) {
        return "";
    }

    const date = new Date(timestamp);

    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (seconds < 60) {
        return "Just now";
    }

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
        <div className="flex gap-4">

            <div
                className="
                    flex
                    h-9
                    w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-100
                    text-brand-green
                "
            >
                {getIcon(activity.activity_type)}
            </div>

            <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <h4 className="text-sm font-semibold text-gray-800">
                            {activity.title}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            {activity.description}
                        </p>

                    </div>

                    <time className="whitespace-nowrap text-xs text-gray-400">
                        {formatRelativeTime(
                            activity.created_at
                        )}
                    </time>

                </div>

                {activity.user_name && (
                    <p className="mt-2 text-xs text-gray-400">
                        by {activity.user_name}
                    </p>
                )}

            </div>

        </div>
    );
}

export default ActivityItem;