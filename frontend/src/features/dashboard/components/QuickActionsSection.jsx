import DashboardSection from "./DashboardSection";
import ActionCard from "./ActionCard";

import { dashboardActions }
from "../config/dashboardActions";

function QuickActionsSection() {

    return (

        <DashboardSection
            title="Quick Actions"
            subtitle="Common compliance tasks"
        >

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                "
            >

                {

                    dashboardActions.map(action => (

                        <ActionCard
                            key={action.id}
                            action={action}
                        />

                    ))

                }

            </div>

        </DashboardSection>

    );

}

export default QuickActionsSection;