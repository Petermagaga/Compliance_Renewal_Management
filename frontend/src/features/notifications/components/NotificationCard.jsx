import { Clock } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import getNotificationIcon from "../utils/getNotificationIcon";
import { FiTrash2 } from "react-icons/fi";

dayjs.extend(relativeTime);

function NotificationCard({

    notification,

    onRead,
    onDelete

}) {

    return (

        <button
            onClick={() => onRead(notification.id)}
            className="
                group
                flex
                w-full
                gap-4
                border-b
                border-slate-100
                p-5
                text-left
                transition
                duration-300
                hover:bg-slate-50
            "
        >

            {/* Icon */}

            <div
                className="
                    relative
                    flex
                    h-11
                    w-11
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                "
            >

                {getNotificationIcon(notification.type)}

                {!notification.is_read && (

                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            h-3
                            w-3
                            rounded-full
                            bg-green-500
                            ring-2
                            ring-white
                        "
                    />

                )}

            </div>

            {/* Content */}

            <div className="flex-1">

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-3
                "
            >

                <h4
                    className="
                        text-sm
                        font-semibold
                        text-slate-900
                    "
                >
                    {notification.title}
                </h4>

                <button
                    onClick={(e) => {

                        e.stopPropagation();

                        onDelete(notification.id);

                    }}
                    className="
                        opacity-0
                        group-hover:opacity-100
                        transition
                        duration-200
                        text-slate-400
                        hover:text-red-500
                    "
                >

                    <FiTrash2 size={15} />

                </button>

            </div>


                <p
                    className="
                        mt-1
                        text-sm
                        leading-relaxed
                        text-slate-500
                    "
                >
                    {notification.message}
                </p>

                <div
                    className="
                        mt-3
                        flex
                        items-center
                        text-xs
                        text-slate-400
                    "
                >

                    <Clock
                        size={13}
                        className="mr-1"
                    />

                    {dayjs(notification.created_at).fromNow()}

                </div>

            </div>

        </button>

    );

}

export default NotificationCard;