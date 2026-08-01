// app/routing/routeRegistry.js

import Dashboard from "../../pages/Dashboard";

import Login from "../../pages/Login"

import ComplianceItems from "../../pages/ComplianceItems";
import Reports from "../../pages/Reports";
import AddComplianceItem from "../../pages/AddComplianceItem";

import NotificationPage from "../../pages/Notifications";
import ReminderPage from  "../../pages/Reminders";

import Settings from "../../pages/Settings";
import ComplianceDetails from "../../features/compliance/pages/ComplianceDetails";
import EditCompliance from "../../features/compliance/pages/EditCompliance";
import NotificationCenter
    from "../../pages/NotificationCenter";

import {
    FiGrid,
    FiShield,
    FiBarChart2,
    FiBell
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

        Component:ComplianceItems,

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

        Component:Reports,

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
        id: "home",
        path: "/",
        Component: Login,
        requiresAuth: false,
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
        id: "notifications",

        path: "/notifications",

        Component: NotificationCenter,

        title: "Notifications",

        icon: FiBell,

        layout: "dashboard",

        requiresAuth: true,

        showInSidebar: true,

        roles: [
            "administrator",
            "manager",
            "compliance_officer",
        ],

        breadcrumb: [
            "Dashboard",
            "Notifications",
        ],
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