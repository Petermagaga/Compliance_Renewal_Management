import DashboardHeader from "./DashboardHeader";
import KPISection from "./KPISection";
import ChartsSection from "./ChartsSection";
import ComplianceSection from "./ComplianceSection";

import ActivitySection from "../../Activity/components/ActivitySection";
import SystemHealthCard from "../../components/SystemHealthCard";
import QuickActionsSection from "./QuickActionsSection";

function DashboardContent() {

    return (

        <div className="space-y-8">

            <DashboardHeader />

            <KPISection />

            <ChartsSection />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                <div className="xl:col-span-8">

                    <ComplianceSection />

                </div>

                <div className="xl:col-span-4 space-y-6">

                    <ActivitySection />

                    <SystemHealthCard />

                </div>

            </div>

            <QuickActionsSection />

        </div>

    );

}

export default DashboardContent;