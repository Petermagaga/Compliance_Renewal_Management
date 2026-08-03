function NotificationHeader({

    unreadCount,

    onMarkAllRead,

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                p-5
            "
        >

            <div>

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-slate-900
                    "
                >
                    Notifications
                </h3>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                    "
                >
                    {unreadCount} unread
                </p>

            </div>

            <button
                onClick={onMarkAllRead}
                className="
                    text-sm
                    font-medium
                    text-brand-green
                    transition
                    hover:underline
                "
            >
                Mark all read
            </button>

        </div>

    );

}

export default NotificationHeader;