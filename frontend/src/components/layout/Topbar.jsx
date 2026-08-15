import { FiMenu } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

import NotificationBell
    from "../../features/notifications/components/NotificationBell";

function Topbar({ onMenuClick }) {

    const { user } = useAuth();

    const today = new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        );

    const hour = today.getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    }

    return (
        <header
            className="
                sticky
                top-0
                z-30
                flex
                h-20
                items-center
                justify-between
                border-b
                border-slate-200
                bg-white
                px-4
                shadow-sm
                sm:px-6
                lg:px-8
            "
        >

            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-3">

                <button
                    type="button"
                    onClick={onMenuClick}
                    className="
                        inline-flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        lg:hidden
                    "
                    aria-label="Open navigation"
                >
                    <FiMenu size={22} />
                </button>

                <div className="min-w-0">

                    <h1
                        className="
                            truncate
                            text-lg
                            font-semibold
                            text-slate-900
                            sm:text-xl
                        "
                    >
                        {greeting},{" "}
                        <span className="font-bold">
                            {user?.full_name || user?.name || "User"}
                        </span>{" "}
                        <span aria-hidden="true">
                            👋
                        </span>
                    </h1>

                    <p
                        className="
                            hidden
                            text-xs
                            text-slate-500
                            sm:block
                        "
                    >
                        Compliance overview
                    </p>

                </div>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-2 sm:gap-4">

                {/* Notification */}

                <NotificationBell />


                {/* Date — desktop only */}

                <div
                    className="
                        hidden
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-slate-600
                        lg:block
                    "
                >
                    {formattedDate}
                </div>

            </div>

        </header>
    );
}

export default Topbar;