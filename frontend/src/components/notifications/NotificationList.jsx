import NotificationItem from "./NotificationItem";

function NotificationList({
    notifications,
    loading,
    onRead,
    onDelete,
    compact = false,
}) {
    if (loading) {
        return (
            <div className="space-y-4">

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="
                            animate-pulse
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                        "
                    >
                        <div className="flex gap-4">

                            <div className="h-10 w-10 rounded-full bg-gray-200" />

                            <div className="flex-1">

                                <div className="h-4 w-1/3 rounded bg-gray-200" />

                                <div className="mt-3 h-3 w-full rounded bg-gray-100" />

                                <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        );
    }

    if (!notifications.length) {
        return (
            <div
                className="
                    rounded-xl
                    border
                    border-dashed
                    border-gray-300
                    bg-white
                    px-6
                    py-14
                    text-center
                "
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    🔔
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                    You're all caught up
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    There are no notifications to display.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={onRead}
                    onDelete={onDelete}
                    compact={compact}
                />
            ))}
        </div>
    );
}

export default NotificationList;