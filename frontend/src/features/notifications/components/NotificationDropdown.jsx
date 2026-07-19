import { useNotifications } from "../context/NotificationContext";

function NotificationDropdown() {

    const {

        notifications,

        loading,

    } = useNotifications();

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

            <div className="p-4 border-b">

                <h3 className="font-semibold">

                    Notifications

                </h3>

            </div>

            {loading && (

                <p className="p-4">

                    Loading...

                </p>

            )}

            {!loading && notifications.length === 0 && (

                <p className="p-4">

                    No notifications.

                </p>

            )}

        </div>

    );

}

export default NotificationDropdown;