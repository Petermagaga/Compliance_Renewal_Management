import MainLayout from "../components/layout/MainLayout";

import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import KPISection from "../features/dashboard/components/KPISection";
import ChartsSection from "../features/dashboard/components/ChartsSection";
import ComplianceSection from "../features/dashboard/components/ComplianceSection";

import ActivitySection from "../features/Activity/components/ActivitySection";

import SystemHealthCard from "../features/components/SystemHealthCard";
import QuickActionsSection from "../features/dashboard/components/QuickActionsSection";

import { DashboardProvider } from "../features/dashboard/context/DashboardContext";

function Dashboard() {
    return (
        <MainLayout>
            <DashboardProvider>
            <main className="min-h-screen bg-slate-50">

            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-8
                    space-y-8
                "
            >


                    {/* Header */}

                    <DashboardHeader />

                    {/* KPI */}

                    <section>
                        <KPISection />
                    </section>

                    {/* Charts */}

                    <section>
                        <ChartsSection />
                    </section>

                    {/* Compliance + Health */}

                    <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">

                        <div className="xl:col-span-8">
                            <ComplianceSection />
                        </div>

                        <div className="xl:col-span-4">
                            <SystemHealthCard />
                        </div>

                    </section>

                    {/* Activity + Actions */}

                    <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">

                        <div className="xl:col-span-8">
                            <ActivitySection />
                        </div>

                        <div className="xl:col-span-4">
                            <QuickActionsSection />
                        </div>

                    </section>

                </div>

            </main>
            </DashboardProvider>
        </MainLayout>
    );
}

export default Dashboard;