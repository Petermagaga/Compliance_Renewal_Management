import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function ActionCard({ action }) {
    const Icon = action.icon;

    return (
        <Link
            to={action.path}
            className="
                group
                flex
                items-center
                gap-4
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                transition
                duration-200
                hover:border-brand-green/40
                hover:bg-brand-light/20
                hover:shadow-sm
            "
        >
            {/* Icon */}

            <div
                className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-white
                    ${action.color}
                `}
            >
                <Icon size={20} />
            </div>


            {/* Content */}

            <div className="min-w-0 flex-1">

                <h3
                    className="
                        truncate
                        text-sm
                        font-semibold
                        text-slate-900
                    "
                >
                    {action.title}
                </h3>

                <p
                    className="
                        mt-0.5
                        truncate
                        text-xs
                        text-slate-500
                    "
                >
                    {action.description}
                </p>

            </div>


            {/* Arrow */}

            <FiArrowRight
                size={17}
                className="
                    shrink-0
                    text-slate-300
                    transition
                    duration-200
                    group-hover:translate-x-1
                    group-hover:text-brand-green
                "
            />

        </Link>
    );
}

export default ActionCard;