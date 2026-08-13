import DashboardSection from "../dashboard/components/DashboardSection";
import HealthBadge from "./HealthBadge";
import HealthProgressBar from "./HealthProgressBar";
import HealthBreakdown from "./HeathBreakdown";
import { useDashboard } from "../dashboard/hooks/useDashboard";
import EmptyState from "../../components/ui/EmptyState";

function SystemHealthCard() {
    const {
        systemHealth,
    } = useDashboard();

    if (!systemHealth) {
        return (
            <DashboardSection
                title="System Health"
                subtitle="Overall compliance status"
            >
                <EmptyState
                    title="Health data unavailable"
                    message="Compliance health will appear once your compliance records are available."
                />
            </DashboardSection>
        );
    }


    return (
        <DashboardSection
            title="System Health"
            subtitle="Overall compliance status"
        >
            <div className="space-y-8">

                {/* Score */}
                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-sm text-gray-500">
                            Compliance Score
                        </p>

                        <h2
                            className="
                                mt-2
                                text-6xl
                                font-extrabold
                                tracking-tight
                                text-gray-900
                            "
                        >
                            {systemHealth.score}%
                        </h2>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                                text-gray-700
                            "
                        >
                            {systemHealth.rating}
                        </p>

                    </div>

                    <HealthBadge
                        rating={systemHealth.rating}
                        color={systemHealth.color}
                    />

                </div>

                {/* Progress */}
                <HealthProgressBar
                    score={systemHealth.score}
                    color={systemHealth.color}
                />

                {/* Trend */}
                <div
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-4
                    "
                >
                    <p className="text-sm text-gray-500">
                        Trend
                    </p>

                    <p
                        className="
                            mt-1
                            font-semibold
                            capitalize
                            text-gray-900
                        "
                    >
                        {systemHealth.trend}
                    </p>
                </div>

                {/* Breakdown */}
                <HealthBreakdown
                    breakdown={systemHealth.breakdown}
                />

            </div>
        </DashboardSection>
    );
}

export default SystemHealthCard;