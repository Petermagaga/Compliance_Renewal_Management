import {
    FiBell,
    FiMail,
    FiMessageCircle,
    FiAlertCircle,
} from "react-icons/fi";

function NotificationStats({ stats }) {

    if (!stats) {
        return null;
    }

    const cards = [
        {
            label: "Total",
            value: stats.total ?? 0,
            icon: <FiBell size={20} />,
        },
        {
            label: "Unread",
            value: stats.unread ?? 0,
            icon: <FiBell size={20} />,
        },
        {
            label: "Email",
            value: stats.email ?? 0,
            icon: <FiMail size={20} />,
        },
        {
            label: "WhatsApp",
            value: stats.whatsapp ?? 0,
            icon: <FiMessageCircle size={20} />,
        },
        {
            label: "Failed",
            value: stats.failed ?? 0,
            icon: <FiAlertCircle size={20} />,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">

            {cards.map((card) => (
                <div
                    key={card.label}
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    "
                >
                    <div className="flex items-center justify-between">

                        <p className="text-sm font-medium text-gray-500">
                            {card.label}
                        </p>

                        <div className="text-brand-green">
                            {card.icon}
                        </div>

                    </div>

                    <p className="mt-3 text-2xl font-bold text-gray-900">
                        {card.value}
                    </p>
                </div>
            ))}

        </div>
    );
}

export default NotificationStats;