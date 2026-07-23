// app/routing/routeRegistry.js

import {
    FiHome,
    FiFileText,
    FiPlusCircle,
    FiBell,
    FiClock,
    FiBarChart2,
    FiSettings,
} from "react-icons/fi";

import Dashboard from "../../pages/Dashboard";
import ComplianceItems from "../../pages/ComplianceItems";
import AddComplianceItem from "../../pages/AddComplianceItem";
import Notifications from "../../pages/Notifications";
import Reminders from "../../pages/Reminders";
import Reports from "../../pages/Reports";
import Settings from "../../pages/Settings";

export const routeRegistry = [

    {
        id: "dashboard",
        title: "Dashboard",
        path: "/dashboard",
        Component: Dashboard,
        icon: FiHome,
        requiresAuth: true,
        showInSidebar: true,
    },

    {
        id: "compliance",
        title: "Compliance Items",
        path: "/compliance",
        Component: ComplianceItems,
        icon: FiFileText,
        requiresAuth: true,
        showInSidebar: true,
    },

    {
        id: "add-compliance",
        title: "Add Compliance",
        path: "/add-item",
        Component: AddComplianceItem,
        icon: FiPlusCircle,
        requiresAuth: true,
        showInSidebar: true,
    },

    {
        id: "notifications",
        title: "Notifications",
        path: "/notifications",
        Component: Notifications,
        icon: FiBell,
        requiresAuth: true,
        showInSidebar: true,
    },

    {
        id: "reminders",
        title: "Reminders",
        path: "/reminders",
        Component: Reminders,
        icon: FiClock,
        requiresAuth: true,
        showInSidebar: true,
    },

    {
        id: "reports",
        title: "Reports",
        path: "/reports",
        Component: Reports,
        icon: FiBarChart2,
        requiresAuth: true,
        showInSidebar: true,
    },

    {
        id: "settings",
        title: "Settings",
        path: "/settings",
        Component: Settings,
        icon: FiSettings,
        requiresAuth: true,
        showInSidebar: true,
    },

];