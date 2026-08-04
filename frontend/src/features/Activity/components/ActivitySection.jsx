function ActivitySection() {

    const {
        recentActivity,
        loading,
    } = useDashboard();

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