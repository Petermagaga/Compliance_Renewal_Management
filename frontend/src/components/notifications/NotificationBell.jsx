import { Bell } from "lucide-react";

import NotificationBadge from "./NotificationBadge";

export default function NotificationBell({

    unreadCount,

    onClick,

}) {

    return (

        <button
            onClick={onClick}
            className="notification-bell"
        >

            <Bell size={22} />

            <NotificationBadge
                count={unreadCount}
            />

        </button>

    );

}