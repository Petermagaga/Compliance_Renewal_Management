import { useNotifications } from "../context/NotificationContext";
import NotificationCard from "./NotificationCard";

function NotificationDropdown() {

    const {
        notifications,
        loading,
        markAsRead,
        markAllAsRead,
    } = useNotifications();

    if (loading) {

        return (

            <div
                className="
                    absolute
                    right-0
                    mt-2
                    w-96
                    bg-white
                    rounded-xl
                    shadow-lg
                    border
                    z-50
                "
            >

                <div className="p-6 text-center">

                    Loading notifications...

                </div>

            </div>

        );

    }

    return (

        <div
            className="
                absolute
                right-0
                mt-2
                w-96
                bg-white
                rounded-xl
                shadow-lg
                border
                z-50
            "
        >

            <div
                className="
                    flex
                    justify-between
                    items-center
                    p-4
                    border-b
                "
            >

                <h3 className="font-semibold">

                    Notifications

                </h3>

                <button
                    onClick={markAllAsRead}
                    className="
                        text-sm
                        text-blue-600
                        hover:underline
                    "
                >

                    Mark all

                </button>

            </div>

            {notifications.length === 0 ? (

                <div className="p-6 text-center text-gray-500">

                    You're all caught up 🎉

                </div>

            ) : (

                <div
                    className="
                        max-h-96
                        overflow-y-auto
                    "
                >

                    {notifications.map((notification) => (

                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onRead={markAsRead}
                        />

                    ))}

                </div>

            )}

            <div className="border-t p-3">

                <button
                    className="
                        w-full
                        text-blue-600
                        hover:underline
                        text-sm
                    "
                >

                    View All Notifications

                </button>

            </div>

        </div>

    );

}

export default NotificationDropdown;