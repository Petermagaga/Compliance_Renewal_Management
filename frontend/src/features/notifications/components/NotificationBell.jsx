import { useState } from "react";
import { Bell } from "lucide-react";
import useNotifications from "../../../auth/hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {

    const { unreadCount } = useNotifications();

    const [open, setOpen] = useState(false);

    return (

        <div className="relative">

        <button
            onClick={() => setOpen(!open)}
            className="
                relative
                rounded-xl
                p-2
                transition
                hover:bg-slate-100
            "
        >
            <Bell size={21} />

            {unreadCount > 0 && (
                <span
                    className="
                        absolute
                        -top-2
                        -right-2
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        text-[11px]
                        font-semibold
                        text-white
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