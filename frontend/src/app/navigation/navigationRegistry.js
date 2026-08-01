import {
    FiGrid,
    FiShield,
    FiPlusCircle,
    FiBell,
    FiClock,
    FiBarChart2,
    FiSettings,
} from "react-icons/fi";

export const navigationRegistry = [
    {
        id: "dashboard",
        title: "Dashboard",
        path: "/dashboard",
        icon: FiGrid,
    },
    {
        id: "compliance",
        title: "Compliance Items",
        path: "/compliance",
        icon: FiShield,
    },
    {
        id: "add-compliance",
        title: "Add Compliance",
        path: "/add-item",
        icon: FiPlusCircle,
    },
    {
        id: "notifications",
        title: "Notifications",
        path: "/notifications",
        icon: FiBell,
    },
    {
        id: "reminders",
        title: "Reminders",
        path: "/reminders",
        icon: FiClock,
    },
    {
        id: "reports",
        title: "Reports",
        path: "/reports",
        icon: FiBarChart2,
    },
    {
        id: "settings",
        title: "Settings",
        path: "/settings",
        icon: FiSettings,
    },
];