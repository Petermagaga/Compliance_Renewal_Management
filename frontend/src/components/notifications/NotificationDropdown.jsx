import { FiArrowRight, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import NotificationList from "./NotificationList";

function NotificationDropdown({
    notifications,
    loading,
    onRead,
    onDelete,
    onClose,
}) {
    const navigate = useNavigate();

    const latestNotifications =
        notifications.slice(0, 5);

    const handleViewAll = () => {
        onClose();
        navigate("/notifications");
    };

    return (
        <div
            className="
                absolute
                right-0
                top-14
                z-50
                w-[380px]
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-xl
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-gray-100
                    px-5
                    py-4
                "
            >
                <div>

                    <h3 className="font-bold text-gray-900">
                        Notifications
                    </h3>

                    <p className="text-xs text-gray-500">
                        Your latest compliance activity
                    </p>

                </div>

                <FiBell
                    size={20}
                    className="text-brand-green"
                />

            </div>

            <div className="max-h-[420px] overflow-y-auto p-3">

                {loading ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                        Loading notifications...
                    </div>
                ) : latestNotifications.length === 0 ? (
                    <div className="p-8 text-center">

                        <div className="text-3xl">
                            🔔
                        </div>

                        <p className="mt-3 text-sm font-semibold text-gray-700">
                            You're all caught up
                        </p>

                    </div>
                ) : (
                    <NotificationList
                        notifications={latestNotifications}
                        loading={false}
                        onRead={onRead}
                        onDelete={onDelete}
                        compact
                    />
                )}

            </div>

            <button
                type="button"
                onClick={handleViewAll}
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-gray-100
                    px-5
                    py-4
                    text-sm
                    font-semibold
                    text-brand-green
                    hover:bg-gray-50
                "
            >
                View all notifications
                <FiArrowRight size={16} />
            </button>
        </div>
    );
}

export default NotificationDropdown;