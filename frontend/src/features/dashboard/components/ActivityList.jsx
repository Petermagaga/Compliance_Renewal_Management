import ActivityItem from "./ActivityItem";

function ActivityList({

    activities,

}) {

    return (

        <div className="space-y-4">

            {

                activities.map(activity => (

                    <ActivityItem

                        key={activity.id}

                        activity={activity}

                    />

                ))

            }

        </div>

    );

}

export default ActivityList;