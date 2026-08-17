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
                        flex
                        items-center
                        justify-between
                        border-y
                        border-slate-100
                        py-4
                    "
                >
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Trend
                        </p>

                        <p className="mt-1 text-sm font-semibold capitalize text-slate-900">
                            {systemHealth.trend}
                        </p>
                    </div>

                    <span className="text-sm text-slate-500">
                        Stable
                    </span>
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