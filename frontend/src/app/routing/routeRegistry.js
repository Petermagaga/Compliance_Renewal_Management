// app/routing/routeRegistry.js

import Dashboard from "../../pages/Dashboard";

import CompliancePage
from "../../pages/CompliancePage";

import ReportsPage from "../../pages/ReportsPage";

import {
    FiGrid,
    FiShield,
    FiBarChart2,
} from "react-icons/fi";

export const routeRegistry = [

    {
        id: "dashboard",

        path: "/dashboard",

        component: Dashboard,

        title: "Dashboard",

        icon: FiGrid,

        layout: "dashboard",

        requiresAuth: true,

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

    icon:FiShield,

    layout:"dashboard",

    requiresAuth:true,

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

    icon:FiBarChart2,

    layout:"dashboard",

    requiresAuth:true,

    showInSidebar:true,

    roles:[

        "administrator",

        "manager"

    ],

    breadcrumb: [
        "Dashboard",
        "Reports"
    ]

},


        {
            id: "login",

            path: "/login",

            component: Login,

            title: "Login",

            layout: "auth",

            requiresAuth: false,

            showInSidebar: false,
        }


];