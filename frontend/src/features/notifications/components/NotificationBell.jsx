import { useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {

    const { unreadCount } = useNotifications();

    const [open, setOpen] = useState(false);

    return (

        <div className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-lg hover:bg-gray-100"
            >

                <Bell size={22} />

                {unreadCount > 0 && (

                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            min-w-[20px]
                            h-5
                            px-1
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-red-500
                            text-white
                            text-xs
                            font-semibold
                        "
                    >
                        {unreadCount}
                    </span>

                )}

            </button>

            {open && (

                <NotificationDropdown
                    close={() => setOpen(false)}
                />

            )}

        </div>

    );

}

export default NotificationBell;