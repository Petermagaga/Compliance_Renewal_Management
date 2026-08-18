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
                px-4
                py-3
                transition-all
                duration-200
                hover:border-brand-green/40
                hover:bg-brand-light/20
                hover:shadow-sm
            "
        >
            <div
                className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    text-white
                    ${action.color}
                `}
            >
                <Icon size={19} />
            </div>

            <div className="min-w-0 flex-1">
                <h3
                    className="
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

            <FiArrowRight
                size={16}
                className="
                    shrink-0
                    text-slate-300
                    transition
                    group-hover:translate-x-1
                    group-hover:text-brand-green
                "
            />
        </Link>
    );
}

export default ActionCard;