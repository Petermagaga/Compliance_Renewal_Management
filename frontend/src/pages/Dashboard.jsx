import MainLayout from "../components/layout/MainLayout";

import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import KPISection from "../features/dashboard/components/KPISection";
import ChartsSection from "../features/dashboard/components/ChartsSection";
import ComplianceSection from "../features/dashboard/components/ComplianceSection";
import ActivitySection from "../features/dashboard/components/ActivitySection";
import SystemHealthCard from "../features/dashboard/components/SystemHealthCard";
import QuickActionsSection from "../features/dashboard/components/QuickActionsSection";

function Dashboard() {
    return (
        <MainLayout>

            <main className="min-h-screen bg-slate-50">

                <div className="mx-auto max-w-[1600px] p-6 lg:p-8">

                    {/* Header */}

                    <DashboardHeader />

                    {/* KPI */}

                    <section className="mt-6">
                        <KPISection />
                    </section>

                    {/* Charts */}

                    <section className="mt-6">
                        <ChartsSection />
                    </section>

                    {/* Compliance + Health */}

                    <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">

                        <div className="xl:col-span-8">
                            <ComplianceSection />
                        </div>

                        <div className="xl:col-span-4">
                            <SystemHealthCard />
                        </div>

                    </section>

                    {/* Activity + Actions */}

                    <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">

                        <div className="xl:col-span-8">
                            <ActivitySection />
                        </div>

                        <div className="xl:col-span-4">
                            <QuickActionsSection />
                        </div>

                    </section>

                </div>

            </main>

        </MainLayout>
    );
}

export default Dashboard;