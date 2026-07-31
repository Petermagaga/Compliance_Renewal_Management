import DashboardSection from "./DashboardSection";

import ComplianceTable
from "../../../components/compliance/ComplianceTable";

import RemindersPanel
from "../../../components/compliance/RemindersPanel";

import {useDashboard} from "../hooks/useDashboard";

function ComplianceSection() {

    const {

        reminders,

        complianceItems,

    } = useDashboard();

    return (

        <DashboardSection
            title="Compliance Overview"
            subtitle="Items requiring attention"
        >

            <div className="space-y-6">

                <ComplianceTable
                    items={complianceItems}
                />

                <RemindersPanel
                    items={reminders}
                />

            </div>

        </DashboardSection>

    );

}

export default ComplianceSection;