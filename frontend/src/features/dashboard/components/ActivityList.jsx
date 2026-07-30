import ActivityItem from "./ActivityItem";

function ActivityList({
    activities,
    loading,
}) {

    if (loading) {
        return (
            <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="animate-pulse flex gap-4"
                    >
                        <div className="h-9 w-9 rounded-full bg-gray-200" />

                        <div className="flex-1">
                            <div className="h-4 w-1/3 rounded bg-gray-200" />
                            <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!activities.length) {
        return (
            <div className="py-10 text-center text-sm text-gray-500">
                No recent activity.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {activities.map((activity) => (
                <ActivityItem
                    key={activity.id}
                    activity={activity}
                />
            ))}
        </div>
    );
}

export default ActivityList;