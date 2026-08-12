import {
    FiMail,
    FiMessageCircle,
    FiCheckCircle,
    FiAlertTriangle,
    FiClock,
    FiEdit3,
    FiPlusCircle,
    FiTrash2,
    FiRefreshCw,
    FiActivity,
} from "react-icons/fi";


export function getActivityIcon(type) {

    switch (type) {

        case "email_sent":
            return FiMail;

        case "whatsapp_sent":
            return FiMessageCircle;

        case "email_failed":
        case "whatsapp_failed":
            return FiAlertTriangle;

        case "renewal":
        case "renewed":
            return FiRefreshCw;

        case "created":
        case "compliance_created":
            return FiPlusCircle;

        case "updated":
        case "compliance_updated":
            return FiEdit3;

        case "deleted":
        case "compliance_deleted":
            return FiTrash2;

        case "reminder_sent":
            return FiCheckCircle;

        case "reminder_pending":
            return FiClock;

        default:
            return FiActivity;
    }
}


export function getActivityColor(type) {

    switch (type) {

        case "email_sent":
            return "bg-blue-50 text-blue-600";

        case "whatsapp_sent":
            return "bg-green-50 text-green-600";

        case "email_failed":
        case "whatsapp_failed":
            return "bg-red-50 text-red-600";

        case "renewal":
        case "renewed":
            return "bg-purple-50 text-purple-600";

        case "created":
        case "compliance_created":
            return "bg-emerald-50 text-emerald-600";

        case "updated":
        case "compliance_updated":
            return "bg-amber-50 text-amber-600";

        case "deleted":
        case "compliance_deleted":
            return "bg-red-50 text-red-600";

        case "reminder_sent":
            return "bg-green-50 text-green-600";

        case "reminder_pending":
            return "bg-slate-100 text-slate-600";

        default:
            return "bg-slate-100 text-slate-600";
    }
}