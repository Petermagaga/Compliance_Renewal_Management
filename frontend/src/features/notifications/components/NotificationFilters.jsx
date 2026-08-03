import {
    FiCheckCircle,
    FiMail,
    FiMessageCircle,
    FiBell,
    FiAlertCircle,
} from "react-icons/fi";

const filters = [
    {
        key: "all",
        label: "All",
        icon: <FiBell size={15} />,
    },
    {
        key: "unread",
        label: "Unread",
        icon: <FiBell size={15} />,
    },
    {
        key: "email",
        label: "Email",
        icon: <FiMail size={15} />,
    },
    {
        key: "whatsapp",
        label: "WhatsApp",
        icon: <FiMessageCircle size={15} />,
    },
    {
        key: "sent",
        label: "Sent",
        icon: <FiCheckCircle size={15} />,
    },
    {
        key: "failed",
        label: "Failed",
        icon: <FiAlertCircle size={15} />,
    },
];

function NotificationFilters({
    activeFilter,
    onChange,
}) {
    return (
        <div className="flex flex-wrap gap-2">

            {filters.map((filter) => {

                const active =
                    activeFilter === filter.key;

                return (
                    <button
                        key={filter.key}
                        type="button"
                        onClick={() =>
                            onChange(filter.key)
                        }
                        className={`
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-3
                            py-2
                            text-sm
                            font-medium
                            transition
                            ${
                                active
                                    ? "border-brand-green bg-brand-green text-white"
                                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }
                        `}
                    >
                        {filter.icon}
                        {filter.label}
                    </button>
                );

            })}

        </div>
    );
}

export default NotificationFilters;