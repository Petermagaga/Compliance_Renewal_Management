import { useDashboard } from "../context/DashboardContext";

import DashboardSection from "./DashboardSection";
import ActivityList from "./ActivityList";
import ActivitySkeleton from "./ActivitySkeleton";
import EmptyActivityState from "./EmptyActivityState";

function ActivitySection() {

    const {

        recentActivity,

        loading,

    } = useDashboard();

    if (loading) {

        return (

            <DashboardSection
                title="Recent Activity"
                subtitle="Latest compliance events"
            >

                <ActivitySkeleton />

            </DashboardSection>

        );

    }

    return (

        <DashboardSection
            title="Recent Activity"
            subtitle="Latest compliance events"
        >

            {

                recentActivity.length === 0

                    ? <EmptyActivityState />

                    : <ActivityList
                        activities={recentActivity}
                    />

            }

        </DashboardSection>

    );

}

export default ActivitySection;