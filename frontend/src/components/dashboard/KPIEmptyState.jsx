import { FiBarChart2 } from "react-icons/fi";

function KPIEmptyState() {

    return (
        <div
            className="
                flex
                min-h-[130px]
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
                py-8
            "
        >

            <div className="text-center">

                <div
                    className="
                        mx-auto
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-400
                    "
                >
                    <FiBarChart2 size={19} />
                </div>

                <h3
                    className="
                        mt-3
                        text-sm
                        font-semibold
                        text-slate-800
                    "
                >
                    No compliance data yet
                </h3>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-500
                    "
                >
                    Add compliance items to see your dashboard metrics.
                </p>

            </div>

        </div>
    );
}

export default KPIEmptyState;