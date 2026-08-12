import { FiBarChart2 } from "react-icons/fi";

function EmptyCharts({
    title = "No chart data available",
    description = "Charts will appear once compliance records are added.",
}) {
    return (
        <div
            className="
                flex
                min-h-[260px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-slate-50/50
                px-6
                py-10
                text-center
            "
        >
            <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-400
                "
            >
                <FiBarChart2 size={21} />
            </div>

            <h3
                className="
                    mt-4
                    text-sm
                    font-semibold
                    text-slate-900
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-1
                    max-w-sm
                    text-xs
                    leading-5
                    text-slate-500
                "
            >
                {description}
            </p>
        </div>
    );
}

export default EmptyCharts;