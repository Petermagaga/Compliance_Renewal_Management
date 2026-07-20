import {
    FiPlusCircle,
    FiShield,
    FiFileText,
    FiUsers,
    FiBell,
    FiCalendar,
} from "react-icons/fi";

export const dashboardActions = [

    {
        id: "add-compliance",
        title: "Add Compliance Item",
        description: "Register a new compliance record.",
        icon: FiPlusCircle,
        color: "bg-green-500",
        path: "/compliance/new",
    },

    {
        id: "view-compliance",
        title: "Compliance Items",
        description: "Manage licenses and certificates.",
        icon: FiShield,
        color: "bg-blue-500",
        path: "/compliance",
    },

    {
        id: "reports",
        title: "Reports",
        description: "Generate executive reports.",
        icon: FiFileText,
        color: "bg-purple-500",
        path: "/reports",
    },

    {
        id: "departments",
        title: "Departments",
        description: "Manage company departments.",
        icon: FiUsers,
        color: "bg-orange-500",
        path: "/departments",
    },

    {
        id: "notifications",
        title: "Notifications",
        description: "View reminders and alerts.",
        icon: FiBell,
        color: "bg-red-500",
        path: "/notifications",
    },

    {
        id: "calendar",
        title: "Compliance Calendar",
        description: "See upcoming renewals.",
        icon: FiCalendar,
        color: "bg-indigo-500",
        path: "/calendar",
    },

];