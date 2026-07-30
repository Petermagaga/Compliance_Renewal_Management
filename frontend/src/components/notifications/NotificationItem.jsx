import {
    FiMail,
    FiMessageCircle,
    FiBell,
    FiCheck,
    FiTrash2,
    FiAlertCircle,
    FiExternalLink,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function getChannelIcon(channel) {
    switch (channel) {
        case "email":
            return <FiMail size={18} />;

        case "whatsapp":
            return <FiMessageCircle size={18} />;

        case "in_app":
        default:
            return <FiBell size={18} />;
    }
}

function getChannelLabel(channel) {
    switch (channel) {
        case "email":
            return "Email";

        case "whatsapp":
            return "WhatsApp";

        case "in_app":
            return "In App";

        default:
            return channel;
    }
}

function getStatusClasses(status) {
    switch (status) {
        case "sent":
            return "bg-green-100 text-green-700";

        case "failed":
            return "bg-red-100 text-red-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        case "read":
            return "bg-gray-100 text-gray-600";

        default:
            return "bg-gray-100 text-gray-600";
    }
}

function formatRelativeTime(dateString) {
    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const now = new Date();

    const diffSeconds = Math.floor(
        (now.getTime() - date.getTime()) / 1000
    );

    if (diffSeconds < 60) {
        return "Just now";
    }

    const minutes = Math.floor(diffSeconds / 60);

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

function NotificationItem({
    notification,
    onRead,
    onDelete,
    compact = false,
}) {
    const navigate = useNavigate();

    const metadata = notification.metadata || {};

    const itemId = metadata.compliance_item_id;

    const isUnread = !notification.is_read;

    const channel = notification.channel;

    const channelLabel = getChannelLabel(channel);

    const handleOpenItem = () => {
        if (itemId) {
            navigate(`/compliance/${itemId}`);
        }
    };

    return (
        <article
            className={`
                relative
                rounded-xl
                border
                p-4
                transition
                duration-200
                ${
                    isUnread
                        ? "border-brand-green/30 bg-green-50/50"
                        : "border-gray-200 bg-white"
                }
                hover:shadow-sm
            `}
        >
            {isUnread && (
                <span
                    className="
                        absolute
                        left-0
                        top-4
                        h-8
                        w-1
                        rounded-r
                        bg-brand-green
                    "
                />
            )}

            <div className="flex items-start gap-4">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        text-gray-700
                    "
                >
                    {getChannelIcon(channel)}
                </div>

                <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                        <div className="min-w-0">

                            <h3
                                className={`
                                    text-sm
                                    ${
                                        isUnread
                                            ? "font-bold text-gray-900"
                                            : "font-semibold text-gray-700"
                                    }
                                `}
                            >
                                {notification.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                {channelLabel}
                            </p>

                        </div>

                        <time className="whitespace-nowrap text-xs text-gray-400">
                            {formatRelativeTime(
                                notification.created_at
                            )}
                        </time>

                    </div>

                    <p
                        className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-600
                        "
                    >
                        {notification.message}
                    </p>

                    {metadata.item_name && (
                        <div
                            className="
                                mt-3
                                rounded-lg
                                bg-gray-50
                                px-3
                                py-2
                            "
                        >
                            <p className="text-xs text-gray-500">
                                Compliance Item
                            </p>

                            <p className="text-sm font-semibold text-gray-800">
                                {metadata.item_name}
                            </p>

                            {metadata.days_remaining !== undefined && (
                                <p className="mt-1 text-xs text-gray-500">
                                    {metadata.days_remaining === 0
                                        ? "Expires today"
                                        : `${metadata.days_remaining} day${
                                              metadata.days_remaining === 1
                                                  ? ""
                                                  : "s"
                                          } remaining`}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-2">

                        <span
                            className={`
                                rounded-full
                                px-2.5
                                py-1
                                text-xs
                                font-semibold
                                ${getStatusClasses(
                                    notification.status
                                )}
                            `}
                        >
                            {notification.status}
                        </span>

                        <div className="ml-auto flex flex-wrap gap-2">

                            {itemId && !compact && (
                                <button
                                    type="button"
                                    onClick={handleOpenItem}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-lg
                                        border
                                        border-gray-200
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-gray-700
                                        hover:bg-gray-50
                                    "
                                >
                                    <FiExternalLink size={13} />
                                    View Item
                                </button>
                            )}

                            {isUnread && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onRead(notification.id)
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-lg
                                        border
                                        border-green-200
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-green-700
                                        hover:bg-green-50
                                    "
                                >
                                    <FiCheck size={13} />
                                    Mark Read
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    onDelete(notification.id)
                                }
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    border
                                    border-red-200
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-red-600
                                    hover:bg-red-50
                                "
                            >
                                <FiTrash2 size={13} />
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </article>
    );
}

export default NotificationItem;