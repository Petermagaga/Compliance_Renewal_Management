import { useDashboard } from "../context/DashboardContext";

import StatCard from
"../../../components/dashboard/StatCard";

import {

    FiShield,

    FiClock,

    FiAlertTriangle,

    FiCheckCircle

} from "react-icons/fi";

function KPISection() {

    const { summary } = useDashboard();

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard

                title="Total Items"

                value={summary.total_items}

                icon={<FiShield size={24}/>}

                color="bg-brand-green"

            />

            <StatCard

                title="Expiring"

                value={summary.expiring}

                icon={<FiClock size={24}/>}

                color="bg-brand-yellow"

            />

            <StatCard

                title="Expired"

                value={summary.expired}

                icon={<FiAlertTriangle size={24}/>}

                color="bg-red-500"

            />

            <StatCard

                title="Active"

                value={summary.active}

                icon={<FiCheckCircle size={24}/>}

                color="bg-green-500"

            />

        </div>

    );

}

export default KPISection;