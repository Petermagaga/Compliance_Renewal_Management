import { FiBarChart2 } from "react-icons/fi";

function EmptyCharts() {
    return (
        <div
            className="
                rounded-2xl
                border
                border-dashed
                border-gray-300
                bg-white
                p-12
                text-center
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-400
                "
            >
                <FiBarChart2 size={30} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
                No chart data available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                Charts will appear once compliance records are added.
            </p>
        </div>
    );
}

export default EmptyCharts;