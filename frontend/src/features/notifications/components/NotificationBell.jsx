import {
    useEffect,
    useRef,
    useState,
} from "react";
import { Bell } from "lucide-react";
import useNotifications from "../../../auth/hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {

    const { unreadCount } = useNotifications();

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {

        function handleClick(event) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener(
            "mousedown",
            handleClick
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClick
            );

    }, []);

    return (

        <div
            ref={dropdownRef}
            className="relative"
        >

            <button
                onClick={() => setOpen(!open)}
                className="
                    relative
                    rounded-xl
                    p-2.5
                    transition
                    duration-300
                    hover:bg-slate-100
                "
            >

                <Bell
                    size={21}
                    className="text-slate-700"
                />

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
                            shadow
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