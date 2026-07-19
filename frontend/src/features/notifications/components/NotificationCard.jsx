import { Clock } from "lucide-react";

function NotificationCard({
    notification,
    onRead,
}) {

    return (

        <button
            onClick={() => onRead(notification.id)}
            className={`
                w-full
                text-left
                p-4
                border-b
                hover:bg-gray-50
                transition
                ${!notification.is_read
                    ? "bg-blue-50"
                    : ""
                }
            `}
        >

            <div className="flex justify-between items-start">

                <div>

                    <h4 className="font-medium">

                        {notification.title}

                    </h4>

                    <p className="text-sm text-gray-600 mt-1">

                        {notification.message}

                    </p>

                </div>

                {!notification.is_read && (

                    <span
                        className="
                            w-2
                            h-2
                            rounded-full
                            bg-blue-600
                            mt-2
                        "
                    />

                )}

            </div>

            <div
                className="
                    flex
                    items-center
                    mt-3
                    text-xs
                    text-gray-400
                "
            >

                <Clock size={14} />

                <span className="ml-1">

                    {notification.created_at}

                </span>

            </div>

        </button>

    );

}

export default NotificationCard;