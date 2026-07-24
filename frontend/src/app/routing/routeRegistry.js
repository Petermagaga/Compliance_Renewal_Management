// app/routing/routeRegistry.js

import Dashboard from "../../pages/Dashboard";

import CompliancePage
from "../../pages/CompliancePage";

import ReportsPage from "../../pages/ReportsPage";
import AddComplianceItem from "../../pages/AddComplianceItem";

import NotificationPage from "../../pages/Notifications";
import ReminderPage from  "../../pages/Reminders";

import Settings from "../../pages/Settings";


import {
    FiGrid,
    FiShield,
    FiBarChart2,
} from "react-icons/fi";

export const routeRegistry = [

    {
        id: "dashboard",

        path: "/dashboard",

        Component: Dashboard,

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

    Component:CompliancePage,

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

    Component:ReportsPage,

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
    id:"settings",

    path:"/settings",

    Component:Settings,

    title:"settings",

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

        "settings"

    ]

}
,


        {
            id: "login",

            path: "/login",

            Component: Login,

            title: "Login",

            layout: "auth",

            requiresAuth: false,

            showInSidebar: false,
        }


];