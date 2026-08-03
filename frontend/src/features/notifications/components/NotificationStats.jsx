import {
    FiBell,
    FiMail,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function NotificationStats({ stats }) {

    if (!stats) {
        return null;
    }

    const cards = [

        {
            label: "Total",
            value: stats.total ?? 0,
            icon: FiBell,
            color: "bg-blue-500",
        },

        {
            label: "Unread",
            value: stats.unread ?? 0,
            icon: FiBell,
            color: "bg-brand-green",
        },

        {
            label: "Email",
            value: stats.email ?? 0,
            icon: FiMail,
            color: "bg-indigo-500",
        },

        {
            label: "WhatsApp",
            value: stats.whatsapp ?? 0,
            icon: FaWhatsapp,
            color: "bg-green-500",
        },

        {
            label: "Failed",
            value: stats.failed ?? 0,
            icon: FiAlertCircle,
            color: "bg-red-500",
        },

    ];

    return (

        <div
            className="
                mb-8
                grid
                grid-cols-2
                gap-4
                lg:grid-cols-5
            "
        >

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.label}
                        className="
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-6
                            shadow-sm
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">

                                    {card.label}

                                </p>

                                <h3
                                    className="
                                        mt-3
                                        text-3xl
                                        font-bold
                                        text-gray-900
                                    "
                                >

                                    {card.value}

                                </h3>

                            </div>

                            <div
                                className={`
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-white
                                    ${card.color}
                                `}
                            >

                                <Icon size={20} />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}

export default NotificationStats;