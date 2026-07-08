import {
    LayoutDashboard,
    ShieldCheck,
    Building2,
    FileText,
    Bell,
    Settings,
} from "lucide-react";

export const navigation = [

    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        name: "Compliance",
        path: "/compliance",
        icon: ShieldCheck,
    },

    {
        name: "Departments",
        path: "/departments",
        icon: Building2,
    },

    {
        name: "Reports",
        path: "/reports",
        icon: FileText,
    },

    {
        name: "Notifications",
        path: "/notifications",
        icon: Bell,
    },

    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];