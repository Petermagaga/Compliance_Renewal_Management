import {

    FiClock,

} from "react-icons/fi";

function ActivityItem({

    activity,

}) {

    return (

        <div
            className="
                flex
                justify-between
                items-start
                border-b
                border-gray-100
                pb-4
            "
        >

            <div>

                <p
                    className="
                        font-medium
                        text-gray-800
                    "
                >

                    {activity.title}

                </p>

                <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                    "
                >

                    {activity.description}

                </p>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-400
                "
            >

                <FiClock />

                {activity.time}

            </div>

        </div>

    );

}

export default ActivityItem;