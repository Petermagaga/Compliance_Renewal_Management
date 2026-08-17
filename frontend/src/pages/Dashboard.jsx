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
                            px-4
                            py-6
                            sm:px-6
                            sm:py-8
                            lg:px-8
                        "
                    >

                        {/* -------------------------------- */}
                        {/* HEADER */}
                        {/* -------------------------------- */}

                        <DashboardHeader />


                        {/* -------------------------------- */}
                        {/* KPI OVERVIEW */}
                        {/* -------------------------------- */}

                        <section className="mt-8">
                            <KPISection />
                        </section>


                        {/* -------------------------------- */}
                        {/* ANALYTICS */}
                        {/* -------------------------------- */}

                        <section className="mt-10">

                            <div className="mb-5">

                                <h2
                                    className="
                                        text-lg
                                        font-semibold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Compliance overview
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    Monitor your current compliance
                                    position and upcoming expiry risk.
                                </p>

                            </div>

                            <ChartsSection />

                        </section>


                        {/* -------------------------------- */}
                        {/* ATTENTION */}
                        {/* -------------------------------- */}

                        <section className="mt-10">

                            <div className="mb-5">

                                <h2
                                    className="
                                        text-lg
                                        font-semibold
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                    Attention required
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    Compliance items that need your
                                    attention soon.
                                </p>

                            </div>

                            <ComplianceSection />

                        </section>


                        {/* -------------------------------- */}
                        {/* ACTIVITY + HEALTH */}
                        {/* -------------------------------- */}

                        <section className="mt-10">

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-6
                                    xl:grid-cols-12
                                "
                            >

                                <div className="xl:col-span-8">
                                    <ActivitySection />
                                </div>

                                <div className="xl:col-span-4">
                                    <SystemHealthCard />
                                </div>

                            </div>

                        </section>


                        {/* -------------------------------- */}
                        {/* QUICK ACTIONS */}
                        {/* -------------------------------- */}

                        <section className="mt-10">

                            <QuickActionsSection />

                        </section>

                    </div>

                </main>

            </DashboardProvider>
        </MainLayout>
    );
}

export default Dashboard;