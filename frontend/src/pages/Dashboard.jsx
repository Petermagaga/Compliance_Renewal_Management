import MainLayout from "../components/layout/MainLayout";

import { DashboardProvider }
from "../features/dashboard/context/DashboardContext";

import DashboardContent
from "../features/dashboard/components/DashboardContent";

function Dashboard() {

    return (

        <MainLayout>

            <DashboardProvider>

                <DashboardContent />

            </DashboardProvider>

        </MainLayout>

    );

}

export default Dashboard;