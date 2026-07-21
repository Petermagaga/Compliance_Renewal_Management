import HealthBadge from "./HealthBadge";

import DashboardSection from "../dashboard/components/DashboardSection";

import HealthProgressBar from "./HealthProgressBar";

import HealthBreakdown from "./HealthBreakdown";
function SystemHealthCard() {

    const {

        systemHealth,

    } = useDashboard();

    if (!systemHealth) return null;

    return (

        <DashboardSection

            title="System Health"

            subtitle="Overall compliance status"

        >

            <div className="space-y-6">

                {/* Score */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
                    "
                >

                    <div>

                        <p
                            className="
                                text-gray-500
                            "
                        >

                            Compliance Score

                        </p>

                        <h2
                            className="
                                text-4xl
                                font-bold
                            "
                        >

                            {systemHealth.score}%

                        </h2>

                    </div>

                    <HealthBadge

                        rating={systemHealth.rating}

                        color={systemHealth.color}

                    />

                </div>

                <HealthProgressBar

                    score={systemHealth.score}

                    color={systemHealth.color}

                />

                <div>

                    <p
                        className="
                            text-sm
                            text-gray-500
                        "
                    >

                        Trend

                    </p>

                    <p
                        className="
                            font-semibold
                        "
                    >

                        {systemHealth.trend}

                    </p>

                </div>

                <HealthBreakdown

                    breakdown={systemHealth.breakdown}

                />

            </div>

        </DashboardSection>

    );

}

export default SystemHealthCard;