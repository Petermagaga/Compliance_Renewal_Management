import {
    FiFileText,
    FiCheckCircle,
    FiAlertTriangle,
    FiClock,
} from "react-icons/fi";

function ExecutiveStats({ items = [] }) {

    const total = items.length;

    const active = items.filter(
        item => item.status === "active"
    ).length;

    const expired = items.filter(
        item => item.status === "expired"
    ).length;

    const expiring = items.filter(
        item => item.status === "expiring"
    ).length;

    const cards = [

        {
            title: "Total Items",
            value: total,
            icon: FiFileText,
            color: "blue",
        },

        {
            title: "Active",
            value: active,
            icon: FiCheckCircle,
            color: "green",
        },

        {
            title: "Expiring",
            value: expiring,
            icon: FiClock,
            color: "yellow",
        },

        {
            title: "Expired",
            value: expired,
            icon: FiAlertTriangle,
            color: "red",
        },

    ];

    const colors = {

        blue: {
            bg: "bg-blue-50",
            icon: "bg-blue-100 text-blue-600",
        },

        green: {
            bg: "bg-green-50",
            icon: "bg-green-100 text-green-600",
        },

        yellow: {
            bg: "bg-yellow-50",
            icon: "bg-yellow-100 text-yellow-600",
        },

        red: {
            bg: "bg-red-50",
            icon: "bg-red-100 text-red-600",
        },

    };

    return (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {cards.map(card => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className={`
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                            shadow-sm
                            transition
                            hover:-translate-y-1
                            hover:shadow-md
                        `}
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${colors[card.color].icon}
                                `}
                            >
                                <Icon size={22}/>
                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}

export default ExecutiveStats;