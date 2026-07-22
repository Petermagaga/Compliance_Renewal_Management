// app/routing/routeRegistry.js

import Dashboard from "../../pages/Dashboard";

import CompliancePage
from "../../pages/CompliancePage";

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




{
    id:"compliance",

    path:"/compliance",

    element:CompliancePage,

    title:"Compliance Items",

    icon:"shield",

    layout:"dashboard",

    protected:true,

    showInSidebar:true,

    roles:[

        "administrator",

        "manager",

        "compliance_officer"

    ],

    breadcrumb:[

        "Dashboard",

        "Compliance"

    ]

}
,

{

    id:"reports",

    path:"/reports",

    element:ReportsPage,

    title:"Reports",

    icon:"chart",

    layout:"dashboard",

    protected:true,

    showInSidebar:true,

    roles:[

        "administrator",

        "manager"

    ]

}


];