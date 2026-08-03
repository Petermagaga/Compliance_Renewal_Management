import { getActivityColor,
    getActivityColor
 } from "../utils/activityutils";



function ActivityIcon({ type }) {

    const Icon = getActivityIcon(type);

    return (

        <div
            className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                ${getActivityColor(type)}
            `}
        >
            <Icon size={18} />
        </div>

    );

}

export default ActivityIcon;