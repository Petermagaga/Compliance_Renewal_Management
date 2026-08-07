import {
    FiMail,
    FiMessageCircle,
    FiPlusCircle,
    FiEdit3,
    FiRefreshCw,
    FiAlertTriangle,
    FiTrash2,
} from "react-icons/fi";

const formatDate = (date) =>

    new Date(date).toLocaleString();

function getIcon(type) {

    switch (type) {

        case "created":
            return <FiPlusCircle />;

        case "updated":
            return <FiEdit3 />;

        case "renewed":
            return <FiRefreshCw />;

        case "expired":
            return <FiAlertTriangle />;

        case "email_sent":
            return <FiMail />;

        case "whatsapp_sent":
            return <FiMessageCircle />;

        case "deleted":
            return <FiTrash2 />;

        default:
            return <FiEdit3 />;

    }

}

function getColor(type) {

    switch (type) {

        case "created":
            return "bg-blue-100 text-blue-600";

        case "updated":
            return "bg-yellow-100 text-yellow-600";

        case "renewed":
            return "bg-green-100 text-green-600";

        case "expired":
            return "bg-red-100 text-red-600";

        case "email_sent":
            return "bg-indigo-100 text-indigo-600";

        case "email_failed":
            return "bg-red-100 text-red-600";

        case "whatsapp_sent":
            return "bg-green-100 text-green-600";

        case "whatsapp_failed":
            return "bg-red-100 text-red-600";
        default:
            return "bg-gray-100 text-gray-600";

    }

}

function TimelineCard({

    timeline = [],

}) {

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            <div className="border-b p-6">

                <h2 className="text-lg font-bold">

                    Lifecycle Timeline

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Complete chronological history of this compliance item.

                </p>

            </div>

            <div className="p-6">

                {

                    timeline.length === 0 ? (

                        <div className="py-12 text-center text-gray-500">

                            No timeline available.

                        </div>

                    ) : (

                        timeline.map((event, index) => (

                            <div
                                key={event.id}
                                className="relative flex gap-5 pb-8"
                            >

                                {index !== timeline.length - 1 && (

                                    <div
                                        className="
                                            absolute
                                            left-5
                                            top-10
                                            h-full
                                            w-px
                                            bg-gray-200
                                        "
                                    />

                                )}

                                <div
                                    className={`
                                        relative
                                        z-10
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        ${getColor(event.activity_type)}
                                    `}
                                >

                                    {getIcon(event.activity_type)}

                                </div>

                                <div className="flex-1">

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <h4 className="font-semibold">

                                            {event.title}

                                        </h4>

                                        <span
                                            className="
                                                text-xs
                                                text-gray-400
                                            "
                                        >

                                            {formatDate(event.created_at)}

                                        </span>

                                    </div>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-gray-600
                                        "
                                    >

                                        {event.description}

                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            text-gray-400
                                        "
                                    >

                                        {event.user_name || "System"}

                                    </p>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default TimelineCard;