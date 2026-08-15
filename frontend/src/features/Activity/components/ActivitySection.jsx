import ActivitySkeleton from "./ActivitySkeleton";
import DashboardErrorState from "../../dashboard/components/DashboardErrorState";
import useDashboard from "../../dashboard/hooks/useDashboard";
import DashboardSection from "../../dashboard/components/DashboardSection";
import EmptyActivityState from "./EmptyActivityState";
import ActivityList from "./ActivityList";
import DashboardErrorState from "../../dashboard/components/DashboardErrorState";
function ActivitySection() {

    const {
        recentActivity,
        loading,
        dashboardError,
        refresh,
    } = useDashboard();

    if (dashboardLoading && !recentActivity.length) {
        return (
            <DashboardSection
                title="Activity Feed"
                subtitle="Live compliance events across your organization."
            >
                <ActivitySkeleton />
            </DashboardSection>
        );
    }

    if (dashboardError && !recentActivity.length) {
        return (
            <DashboardSection
                title="Activity Feed"
                subtitle="Live compliance events across your organization."
            >
                <DashboardErrorState
                    title="Unable to load activity"
                    message="Recent compliance activity could not be retrieved."
                    onRetry={refresh}
                />
            </DashboardSection>
        );
    }

    if (loading) {

        return (

            <DashboardSection
                title="Activity Feed"
                subtitle="Live compliance events across your organization."
            >

                <ActivitySkeleton />

            </DashboardSection>

        );

    }

    return (


    <DashboardSection
        title="Activity Feed"
        subtitle="Live compliance events across your organization."
        action={

            <button
                className="
                    text-sm
                    font-medium
                    text-brand-green
                    hover:underline
                "
            >
                View All →
            </button>

        }
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