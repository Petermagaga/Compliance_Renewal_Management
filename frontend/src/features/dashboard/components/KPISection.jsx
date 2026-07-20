import {
    FiShield,
    FiClock,
    FiAlertTriangle,
    FiCheckCircle,
} from "react-icons/fi";

import { useDashboard } from "../context/DashboardContext";
import StatCard from "../../../components/dashboard/StatCard";

function KPISection() {

    const { summary } = useDashboard();

    const cards = [

        {
            title: "Total Compliance Items",
            value: summary?.total_items ?? 0,
            subtitle: "All registered items",
            color: "bg-brand-green",
            icon: <FiShield size={24} className="text-white" />,
        },

        {
            title: "Expiring Soon",
            value: summary?.expiring ?? 0,
            subtitle: "Require attention",
            color: "bg-brand-yellow",
            icon: <FiClock size={24} className="text-white" />,
        },

        {
            title: "Expired",
            value: summary?.expired ?? 0,
            subtitle: "Immediate action required",
            color: "bg-red-500",
            icon: <FiAlertTriangle size={24} className="text-white" />,
        },

        {
            title: "Active",
            value: summary?.active ?? 0,
            subtitle: "Currently compliant",
            color: "bg-green-500",
            icon: <FiCheckCircle size={24} className="text-white" />,
        },

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

                <StatCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    subtitle={card.subtitle}
                    color={card.color}
                    icon={card.icon}
                />

            ))}

        </div>

    );

}

export default KPISection;