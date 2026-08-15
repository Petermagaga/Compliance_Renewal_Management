import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-50">

            <Sidebar
                open={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <div
                className="
                    min-h-screen
                    lg:ml-64
                "
            >

                <Topbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default MainLayout;