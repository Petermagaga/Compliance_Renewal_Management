import { formatDateTime } from "../../../utils/date";
import {
    FiMail,
    FiPlusCircle,
    FiRefreshCw,
    FiClock,
} from "react-icons/fi";

function ActivityItem({ activity }) {

    const getIcon = () => {

        switch (activity.type) {

            case "reminder":
                return <FiMail className="text-blue-500" size={18} />;

            case "created":
                return <FiPlusCircle className="text-green-500" size={18} />;

            case "renewed":
                return <FiRefreshCw className="text-purple-500" size={18} />;

            default:
                return <FiClock className="text-gray-400" size={18} />;

        }

    };

    return (

        <div className="flex gap-4">

            {/* Timeline Icon */}

            <div className="mt-1">

                {getIcon()}

            </div>

            {/* Content */}

            <div className="flex-1">

                <h4 className="font-semibold text-gray-800">

                    {activity.title}

                </h4>

                <p className="text-sm text-gray-500">

                    {activity.description}

                </p>

                <p className="text-xs text-gray-400 mt-2">

                    {new Date(activity.timestamp).toLocaleString()}

                </p>

<p>

    {formatDateTime(activity.timestamp)}

</p>

            </div>

        </div>

    );

}

export default ActivityItem;