import ActivityAvatar from "./ActivityAvatar";
import ActivityIcon from "./ActivityIcon";
import ActivityTimestamp from "./ActivityTimestamp";

function ActivityCard({ activity }) {

    const type =
        activity.activity_type || activity.type;

    const timestamp =
        activity.created_at || activity.timestamp;

    return (

        <article
            className="
                relative
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-green-400
                hover:shadow-md
            "
        >



                {/* Activity Icon */}

                <ActivityIcon type={type} />

                {/* Content */}

                <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <h3
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                "
                            >
                                {activity.title}
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-gray-500
                                "
                            >
                                {activity.description}
                            </p>

                        </div>

                        <ActivityTimestamp
                            timestamp={timestamp}
                        />

                    </div>

                    {(activity.user_name ||
                        activity.user_role) && (

                        <div
                            className="
                                mt-4
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <ActivityAvatar
                                name={activity.user_name}
                            />

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-gray-800
                                    "
                                >
                                    {activity.user_name}
                                </p>

                                {activity.user_role && (

                                    <p
                                        className="
                                            text-xs
                                            text-gray-400
                                        "
                                    >
                                        {activity.user_role}
                                    </p>

                                )}

                            </div>

                        </div>

                    )}

                </div>

            

        </article>

    );

}

export default ActivityCard;