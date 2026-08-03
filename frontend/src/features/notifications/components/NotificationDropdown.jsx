import { useNotifications } from "../context/NotificationContext";

import NotificationHeader from "./NotificationHeader";
import NotificationFooter from "./NotificationFooter";
import NotificationCard from "./NotificationCard";
import NotificationSkeleton from "./NotificationSkeleton";
import EmptyNotifications from "./EmptyNotifications";

function NotificationDropdown() {

    const {

        notifications,

        loading,

        unreadCount,

        markAsRead,

        markAllAsRead,
        deleteNotification

    } = useNotifications();

    return (

        <div
            className="
                absolute
                right-0
                mt-3
                w-96
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
                z-50
            "
        >

            <NotificationHeader
                unreadCount={unreadCount}
                onMarkAllRead={markAllAsRead}
            />

            {loading ? (

                <NotificationSkeleton />

            ) : notifications.length === 0 ? (

                <EmptyNotifications />

            ) : (

                <div
                    className="
                        max-h-[420px]
                        overflow-y-auto
                    "
                >

                    {notifications.map(notification => (

                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onRead={markAsRead}
                            onDelete={deleteNotification}
                        />

                    ))}

                </div>

            )}

            <NotificationFooter />

        </div>

    );

}

export default NotificationDropdown;