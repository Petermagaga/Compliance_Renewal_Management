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
    // 1. Loading
    // ---------------------------------------
    if (dashboardLoading && !summary) {
        return (
            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="
                            h-32
                            animate-pulse
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                        "
                    />
                ))}
            </div>
        );
    }

    // ---------------------------------------
    // 2. Error
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
    // 3. Empty
    // ---------------------------------------
    if (!summary) {
        return <KPIEmptyState />;
    }

    // ---------------------------------------
    // 4. Success
    // ---------------------------------------
    return (
        <div
            className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
                xl:grid-cols-4
            "
        >
            <StatCard
                title="Total Compliance Items"
                value={summary.total_items ?? 0}
                subtitle="All registered items"
                icon={
                    <FiShield
                        size={21}
                        className="text-white"
                    />
                }
                color="bg-brand-green"
            />

            <StatCard
                title="Expiring Soon"
                value={summary.expiring ?? 0}
                subtitle="Requires attention"
                icon={
                    <FiClock
                        size={21}
                        className="text-white"
                    />
                }
                color="bg-amber-500"
            />

            <StatCard
                title="Expired"
                value={summary.expired ?? 0}
                subtitle="Requires immediate action"
                icon={
                    <FiAlertTriangle
                        size={21}
                        className="text-white"
                    />
                }
                color="bg-red-500"
            />

            <StatCard
                title="Active"
                value={summary.active ?? 0}
                subtitle="Currently compliant"
                icon={
                    <FiCheckCircle
                        size={21}
                        className="text-white"
                    />
                }
                color="bg-emerald-500"
            />
        </div>
    );
}

export default KPISection;