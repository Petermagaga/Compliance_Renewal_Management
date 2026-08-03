import {
    FiMail,
    FiEdit3,
    FiAlertTriangle,
    FiRefreshCw,
    FiTrash2,
    FiPlusCircle,
    FiXCircle,
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

import { formatDistanceToNow } from "date-fns";

export function getActivityIcon(type) {

    switch (type) {

        case "created":
            return FiPlusCircle;

        case "updated":
            return FiEdit3;

        case "renewed":
            return FiRefreshCw;

        case "expired":
            return FiAlertTriangle;

        case "email_sent":
            return FiMail;

        case "whatsapp_sent":
            return FaWhatsapp;

        case "whatsapp_failed":
            return FiXCircle;

        case "deleted":
            return FiTrash2;

        default:
            return FiMail;

    }

}

export function getActivityColor(type) {

    switch (type) {

        case "created":
            return "bg-blue-100 text-blue-600";

        case "updated":
            return "bg-amber-100 text-amber-600";

        case "renewed":
            return "bg-green-100 text-green-600";

        case "expired":
            return "bg-red-100 text-red-600";

        case "deleted":
            return "bg-gray-100 text-gray-600";

        case "whatsapp_failed":
            return "bg-red-100 text-red-600";

        case "email_sent":
            return "bg-emerald-100 text-emerald-600";

        case "whatsapp_sent":
            return "bg-green-100 text-green-600";

        default:
            return "bg-slate-100 text-slate-600";

    }

}

export function formatActivityTime(timestamp) {

    if (!timestamp) return "";

    return formatDistanceToNow(
        new Date(timestamp),
        {
            addSuffix: true,
        }
    );

}