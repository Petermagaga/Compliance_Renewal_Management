// app/routing/routeRegistry.js

import Dashboard from "../../pages/Dashboard";

import CompliancePage
from "../../pages/CompliancePage";

import ReportsPage from "../../pages/ReportsPage";
import AddComplianceItem from "../../pages/AddComplianceItem";

import NotificationPage from "../../pages/Notifications";
import ReminderPage from  "../../pages/Reminders";

import Settings from "../../pages/Settings";
import ComplianceDetails from "../../pages/ComplianceDetails";
import EditCompliance from "../../pages/EditCompliance";

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
        id:"Settings",

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

        id:"Reminders",

        path:"/reminders",

        Component:ReminderPage,

        title:"Reminder",

        icon:FiBarChart2,

        layout:"dashboard",

        requiresAuth:true,

        showInSidebar:true,

        roles:[

            "administrator",

            "reminder"

        ],

        breadcrumb: [
            "Dashboard",
            "Reports"
        ]

    },


    {
        id: "compliance-details",

        path: "/compliance/:id",

        Component: ComplianceDetails,

        requiresAuth: true,

        showInSidebar: false,
    },

    {
        id: "edit-compliance",

        path: "/compliance/:id/edit",

        Component: EditCompliance,

        requiresAuth: true,

        showInSidebar: false,
    },

    {

        id:"notifications",

        path:"/notifications",

        Component:NotificationPage,

        title:"Notifications",

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
            "Notifications"
        ]

    },


    {

        id:"addcompliance",

        path:"/add-item",

        Component: AddComplianceItem,

        title:"Add Compliance",

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
            "Add Compliance"
        ]

    },


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