import { Link } from "react-router-dom";

function ActionCard({ action }) {
    const Icon = action.icon;

    return (
        <Link
            to={action.path}
            className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:border-green-300
                hover:shadow-xl
            "
        >
            <div
                className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    text-white
                    ${action.color}
                `}
            >
                <Icon size={24} />
            </div>

            <h3
                className="
                    mt-5
                    text-lg
                    font-semibold
                    text-gray-900
                "
            >
                {action.title}
            </h3>

            <p
                className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-500
                "
            >
                {action.description}
            </p>
        </Link>
    );
}

export default ActionCard;