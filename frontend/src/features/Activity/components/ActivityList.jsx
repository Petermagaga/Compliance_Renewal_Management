import ActivityCard from "./ActivityCard";

function ActivityList({

    activities = [],

}) {

    return (

        <div
            className="
                relative
                max-h-[600px]
                overflow-y-auto
                pr-2
            "
        >

            {activities.map((activity, index) => (

                <div
                    key={
                        activity.id ??
                        activity.timestamp ??
                        index
                    }
                    className="
                        relative
                        pl-12
                        pb-12
                    "
                >

                    {/* Vertical Timeline */}

                    {index !== activities.length - 1 && (

                        <div
                            className="
                                absolute
                                left-[18px]
                                top-8
                                bottom-0
                                w-px
                                bg-gray-200
                            "
                        />

                    )}

                    {/* Timeline Dot */}

                    <div
                        className="
                            absolute
                            left-3
                            top-6
                            h-3
                            w-3
                            rounded-full
                            bg-brand-green
                            ring-4
                            ring-white
                        "
                    />

                    <ActivityCard
                        activity={activity}
                    />

                </div>

            ))}

        </div>

    );

}

export default ActivityList;