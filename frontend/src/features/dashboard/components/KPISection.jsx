import {
    FiShield,
    FiClock,
    FiAlertTriangle,
    FiCheckCircle,
} from "react-icons/fi";

import StatCard from "../../../components/dashboard/StatCard";
import KPIEmptyState from "../../../components/dashboard/KPIEmptyState";
import DashboardErrorState from "./DashboardErrorState";

import { useDashboard } from "../hooks/useDashboard";

function KPISection() {

    const {
        summary,
        dashboardLoading,
        dashboardError,
        refresh,
    } = useDashboard();


    // ---------------------------------------
    // Loading
    // ---------------------------------------

    if (dashboardLoading && !summary) {

        return (
            <div
                className="
                    grid
                    grid-cols-2
                    gap-3
                    lg:grid-cols-4
                "
            >

                {[1, 2, 3, 4].map((item) => (

                    <div
                        key={item}
                        className="
                            h-32
                            animate-pulse
                            rounded-2xl
                            bg-white
                            shadow-[0_1px_3px_rgba(15,23,42,0.06)]
                        "
                    />

                ))}

            </div>
        );
    }


    // ---------------------------------------
    // Error
    // ---------------------------------------

    if (dashboardError && !summary) {

        return (
            <DashboardErrorState
                title="Unable to load compliance summary"
                message="We couldn't retrieve the latest compliance metrics."
                onRetry={refresh}
            />
        );
    }


    // ---------------------------------------
    // Empty
    // ---------------------------------------

    if (!summary) {
        return <KPIEmptyState />;
    }


    // ---------------------------------------
    // Success
    // ---------------------------------------

    return (

        <div
            className="
                grid
                grid-cols-2
                gap-3
                lg:grid-cols-4
                lg:gap-4
            "
        >

            <StatCard
                title="Total Items"
                value={summary.total_items ?? 0}
                subtitle="Registered compliance items"
                icon={
                    <FiShield
                        size={19}
                    />
                }
                color="neutral"
            />


            <StatCard
                title="Expiring Soon"
                value={summary.expiring ?? 0}
                subtitle="Requires attention"
                icon={
                    <FiClock
                        size={19}
                    />
                }
                color="warning"
            />


            <StatCard
                title="Expired"
                value={summary.expired ?? 0}
                subtitle="Immediate action required"
                icon={
                    <FiAlertTriangle
                        size={19}
                    />
                }
                color="danger"
                emphasis
            />


            <StatCard
                title="Active"
                value={summary.active ?? 0}
                subtitle="Currently compliant"
                icon={
                    <FiCheckCircle
                        size={19}
                    />
                }
                color="success"
            />

        </div>
    );
}

export default KPISection;