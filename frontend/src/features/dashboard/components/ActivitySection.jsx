import {useDashboard} from "../hooks/useDashboard";

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
                title="Activity Feed"
                subtitle="Recent compliance events across your organization."
            >
                <ActivitySkeleton />
            </DashboardSection>
        );
    }

    return (
        <DashboardSection
            title="Recent Activity"
            subtitle="What's happening across your compliance workspace."
        >
            {recentActivity.length === 0 ? (
                <EmptyActivityState />
            ) : (
                <ActivityList activities={recentActivity} />
            )}
        </DashboardSection>
    );
}

export default ActivitySection;