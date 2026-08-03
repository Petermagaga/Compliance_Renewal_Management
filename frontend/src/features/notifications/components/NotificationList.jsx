import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";
import NotificationSkeleton from "./NotificationSkeleton";

function NotificationList({
    notifications = [],
    loading = false,
    onRead,
    onDelete,
}) {

    if (loading) {
        return <NotificationSkeleton />;
    }

    if (notifications.length === 0) {
        return <EmptyNotifications />;
    }

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                overflow-hidden
            "
        >

            {notifications.map((notification, index) => (

                <div
                    key={notification.id}
                    className={
                        index !== notifications.length - 1
                            ? "border-b border-slate-100"
                            : ""
                    }
                >

                    <NotificationCard
                        notification={notification}
                        onRead={onRead}
                        onDelete={onDelete}
                    />

                </div>

            ))}

        </div>

    );

}

export default NotificationList;