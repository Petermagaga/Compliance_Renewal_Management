import DashboardSection from "./DashboardSection";

import ComplianceTable
    from "../../../components/compliance/ComplianceTable";

import RemindersPanel
    from "../../../components/compliance/RemindersPanel";

import { useDashboard }
    from "../hooks/useDashboard";


function ComplianceSection() {

    const {
        reminders,
        complianceItems,
    } = useDashboard();


    console.log(
        "COMPLIANCE SECTION reminders:",
        reminders
    );

    console.log(
        "COMPLIANCE SECTION complianceItems:",
        complianceItems
    );


    return (

        <DashboardSection
            title="Compliance Workspace"
            subtitle="Track every compliance item and upcoming renewal."
        >

            <div className="space-y-0">

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