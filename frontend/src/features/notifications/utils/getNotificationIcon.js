import {
    FiMail,
    FiBell,
    FiCheckCircle,
    FiRefreshCw,
    FiAlertCircle,
    FiMessageCircle,
} from "react-icons/fi";

function getNotificationIcon(type) {

    switch (type?.toLowerCase()) {

        case "email":
        case "email_sent":
        case "reminder":
            return (
                <FiMail
                    size={18}
                    className="text-blue-600"
                />
            );

        case "whatsapp":
        case "whatsapp_sent":
            return (
                <FiMessageCircle
                    size={18}
                    className="text-green-600"
                />
            );

        case "renewal":
            return (
                <FiRefreshCw
                    size={18}
                    className="text-emerald-600"
                />
            );

        case "success":
            return (
                <FiCheckCircle
                    size={18}
                    className="text-green-600"
                />
            );

        case "failed":
        case "error":
            return (
                <FiAlertCircle
                    size={18}
                    className="text-red-500"
                />
            );

        default:
            return (
                <FiBell
                    size={18}
                    className="text-brand-green"
                />
            );
    }

}

export default getNotificationIcon;