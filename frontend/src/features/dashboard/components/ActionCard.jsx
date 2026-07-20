import { Link } from "react-router-dom";

function ActionCard({ action }) {

    const Icon = action.icon;

    return (

        <Link
            to={action.path}
            className="
                group
                bg-white
                border
                rounded-xl
                p-5
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
            "
        >

            <div
                className={`
                    w-12
                    h-12
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-white
                    ${action.color}
                `}
            >

                <Icon size={22} />

            </div>

            <h3
                className="
                    mt-4
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
                    text-gray-500
                "
            >

                {action.description}

            </p>

        </Link>

    );

}

export default ActionCard;