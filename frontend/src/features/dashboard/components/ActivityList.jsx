import ActivityItem from "./ActivityItem";

function ActivityList({

    activities,

}) {

    return (

        <div className="space-y-6">

            {

                activities.map((activity,index)=>(

                    <ActivityItem

                        key={index}

                        activity={activity}

                    />

                ))

            }

        </div>

    );

}

export default ActivityList;