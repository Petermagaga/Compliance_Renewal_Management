import {
    FiHome,
    FiFileText,
    FiPlusCircle,
    FiBell,
    FiClock,
    FiBarChart2,
    FiSettings
} from "react-icons/fi";

const navigation = [

    {
        title: "Dashboard",
        path: "/dashboard",
        icon: FiHome
    },

    {
        title: "Compliance Items",
        path: "/compliance",
        icon: FiFileText
    },

    {
        title: "Add Compliance",
        path: "/add-item",
        icon: FiPlusCircle
    },

    {
        title: "Notifications",
        path: "/notifications",
        icon: FiBell
    },

    {
        title: "Reminders",
        path: "/reminders",
        icon: FiClock
    },

    {
        title: "Reports",
        path: "/reports",
        icon: FiBarChart2
    },

    {
        title: "Settings",
        path: "/settings",
        icon: FiSettings
    }

];

export default navigation;