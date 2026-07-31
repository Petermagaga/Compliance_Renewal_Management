import {
    FiShield,
    FiClock,
    FiAlertTriangle,
    FiCheckCircle,
} from "react-icons/fi";

import StatCard from "../../../components/dashboard/StatCard";
import { useDashboard } from "../hooks/useDashboard";

function KPISection() {
    const { summary, loading } = useDashboard();

    if (loading && !summary) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="
                            h-32
                            animate-pulse
                            rounded-2xl
                            bg-white
                        "
                    />
                ))}

            </div>
        );
    }

    if (!summary) {
        return null;
    }

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