import { useEffect, useRef, useState } from "react";
import { FiBell } from "react-icons/fi";

import useNotifications from "../../auth/hooks/useNotifications";
import NotificationBadge from "./NotificationBadge";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {

    const [open, setOpen] = useState(false);

    const containerRef = useRef(null);

    const {
        notifications,
        unreadCount,
        loading,
        markRead,
        remove,
    } = useNotifications();

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                containerRef.current &&
                !containerRef.current.contains(
                    event.target
                )
            ) {

                setOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);

    return (
        <div
            ref={containerRef}
            className="relative"
        >

            <button
                type="button"
                onClick={() =>
                    setOpen((previous) => !previous)
                }
                aria-label="Notifications"
                className="
                    relative
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    text-gray-600
                    hover:bg-gray-100
                    hover:text-gray-900
                "
            >
                <FiBell size={21} />

                <NotificationBadge
                    count={unreadCount}
                />
            </button>

            {open && (
                <NotificationDropdown
                    notifications={notifications}
                    loading={loading}
                    onRead={markRead}
                    onDelete={remove}
                    onClose={() => setOpen(false)}
                />
            )}

        </div>
    );
}

export default NotificationBell;