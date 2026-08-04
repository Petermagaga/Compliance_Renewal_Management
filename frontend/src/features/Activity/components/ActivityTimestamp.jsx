import {
    formatActivityTime,
} from "../utils/activityutils";

function ActivityTimestamp({

    timestamp,

}) {

    return (

        <time
            className="
                text-xs
                text-slate-400
                whitespace-nowrap
            "
        >
            {formatActivityTime(timestamp)}

        </time>

    );

}

export default ActivityTimestamp;