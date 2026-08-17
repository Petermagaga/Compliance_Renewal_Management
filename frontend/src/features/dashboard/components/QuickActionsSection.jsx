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
                    grid-cols-2
                    gap-3
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