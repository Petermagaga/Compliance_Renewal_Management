import {
    FiBell,
    FiMail,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const filters = [
    {
        key: "all",
        label: "All",
        icon: FiBell,
    },
    {
        key: "unread",
        label: "Unread",
        icon: FiBell,
    },
    {
        key: "email",
        label: "Email",
        icon: FiMail,
    },
    {
        key: "whatsapp",
        label: "WhatsApp",
        icon: FaWhatsapp,
    },
    {
        key: "sent",
        label: "Sent",
        icon: FiCheckCircle,
    },
    {
        key: "failed",
        label: "Failed",
        icon: FiAlertCircle,
    },
];

function NotificationFilters({
    activeFilter,
    onChange,
}) {

    return (

        <div className="flex flex-wrap gap-2">

            {filters.map((filter) => {

                const Icon = filter.icon;

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
                            rounded-full
                            border
                            px-4
                            py-2
                            text-sm
                            font-medium
                            transition
                            duration-200
                            ${
                                active
                                    ? "border-brand-green bg-brand-green text-white"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-brand-green hover:text-brand-green"
                            }
                        `}
                    >
                        <Icon size={15} />

                        {filter.label}

                    </button>

                );

            })}

        </div>

    );

}

export default NotificationFilters;