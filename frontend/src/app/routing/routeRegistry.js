// app/routing/routeRegistry.js

import Dashboard from "../../pages/Dashboard";

export const routeRegistry = [

    {
        id: "dashboard",

        path: "/dashboard",

        element: Dashboard,

        title: "Dashboard",

        icon: "dashboard",

        layout: "dashboard",

        protected: true,

        roles: [

            "administrator",

            "manager",

            "compliance_officer",

            "viewer"

        ],

        showInSidebar: true,

        breadcrumb: [

            "Dashboard"

        ],

    },

];