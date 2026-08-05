import {
    FiPlusCircle,
    FiEdit3,
    FiMail,
    FiRefreshCw,
    FiAlertTriangle,
    FiTrash2,
} from "react-icons/fi";

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

        case "deleted":
            return "bg-red-100 text-red-600";

        default:
            return "bg-gray-100 text-gray-600";

    }

}

function AuditTrailCard({

    events = [],

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

                    Audit Trail

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Complete history of changes made to this compliance item.

                </p>

            </div>

            <div className="divide-y">

                {

                    events.length === 0 ? (

                        <div className="p-8 text-center text-gray-500">

                            No audit history available.

                        </div>

                    ) : (

                        events.map(event => (

                            <div
                                key={event.id}
                                className="
                                    flex
                                    items-start
                                    gap-4
                                    p-5
                                "
                            >

                                <div
                                    className={`
                                        flex
                                        h-11
                                        w-11
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

                                            {event.created_at}

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

export default AuditTrailCard;