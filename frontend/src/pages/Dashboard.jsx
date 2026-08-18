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
                            px-5
                            py-8
                            sm:px-6
                            lg:px-8
                            lg:py-10
                        "
                    >

                        {/* -------------------------------- */}
                        {/* Header */}
                        {/* -------------------------------- */}

                        <DashboardHeader />


                        {/* -------------------------------- */}
                        {/* Compliance Overview */}
                        {/* -------------------------------- */}

                        <DashboardPageSection
                            title="Compliance Overview"
                            subtitle="Your current compliance position at a glance."
                        >
                            <KPISection />
                        </DashboardPageSection>


                        {/* -------------------------------- */}
                        {/* Analytics */}
                        {/* -------------------------------- */}

                        <DashboardPageSection
                            title="Analytics"
                            subtitle="Compliance status and upcoming expiry trends."
                        >
                            <ChartsSection />
                        </DashboardPageSection>


                        {/* -------------------------------- */}
                        {/* Attention Required */}
                        {/* -------------------------------- */}

                        <DashboardPageSection
                            title="Attention Required"
                            subtitle="Review upcoming renewals and compliance risks."
                        >

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-6
                                    xl:grid-cols-12
                                "
                            >

                                <div className="xl:col-span-8">
                                    <ComplianceSection />
                                </div>

                                <div className="xl:col-span-4">
                                    <SystemHealthCard />
                                </div>

                            </div>

                        </DashboardPageSection>


                        {/* -------------------------------- */}
                        {/* Operations */}
                        {/* -------------------------------- */}

                        <DashboardPageSection
                            title="Operations"
                            subtitle="Recent activity and common compliance tasks."
                        >

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-6
                                    xl:grid-cols-8
                                "
                            >

                                <div className="xl:col-span-5">
                                    <ActivitySection />
                                </div>

                                <div className="xl:col-span-3">
                                    <QuickActionsSection />
                                </div>

                            </div>

                        </DashboardPageSection>

                    </div>

                </main>

            </DashboardProvider>

        </MainLayout>
    );
}


/*
|--------------------------------------------------------------------------
| Dashboard page section
|--------------------------------------------------------------------------
|
| This is deliberately NOT a card.
|
| It creates hierarchy between major areas of the dashboard without
| introducing another visual container.
|
*/

function DashboardPageSection({
    title,
    subtitle,
    children,
}) {

    return (
        <section className="mt-12">

            <div className="mb-5">

                <h2
                    className="
                        text-xl
                        font-semibold
                        tracking-tight
                        text-slate-900
                    "
                >
                    {title}
                </h2>

                <p
                    className="
                        mt-1
                        max-w-2xl
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    {subtitle}
                </p>

            </div>

            {children}

        </section>
    );
}


export default Dashboard;