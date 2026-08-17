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
                            space-y-10
                            px-6
                            py-8
                            lg:px-8
                        "
                    >

                        {/* Header */}

                        <DashboardHeader />


                        {/* Overview */}

                        <section>

                            <div className="mb-4">

                                <h2 className="text-lg font-semibold text-slate-900">
                                    Compliance Overview
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your current compliance position at a glance.
                                </p>

                            </div>

                            <KPISection />

                        </section>


                        {/* Analytics */}

                        <section>

                            <div className="mb-4">

                                <h2 className="text-lg font-semibold text-slate-900">
                                    Analytics
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Compliance status and upcoming expiry trends.
                                </p>

                            </div>

                            <ChartsSection />

                        </section>


                        {/* Attention */}

                        <section>

                            <div className="mb-4">

                                <h2 className="text-lg font-semibold text-slate-900">
                                    Attention Required
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Review upcoming renewals and compliance risks.
                                </p>

                            </div>

                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

                                <div className="xl:col-span-8">
                                    <ComplianceSection />
                                </div>

                                <div className="xl:col-span-4">
                                    <SystemHealthCard />
                                </div>

                            </div>

                        </section>


                        {/* Operations */}

                        <section>

                            <div className="mb-4">

                                <h2 className="text-lg font-semibold text-slate-900">
                                    Recent Activity
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Recent compliance and notification activity.
                                </p>

                            </div>

                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

                                <div className="xl:col-span-8">
                                    <ActivitySection />
                                </div>

                                <div className="xl:col-span-4">
                                    <QuickActionsSection />
                                </div>

                            </div>

                        </section>

                    </div>

                </main>

            </DashboardProvider>

        </MainLayout>
    );
}

export default Dashboard;