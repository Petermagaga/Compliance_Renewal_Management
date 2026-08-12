import {
    FiAlertCircle,
    FiRefreshCw,
} from "react-icons/fi";


function DashboardErrorState({
    title = "Unable to load this section",
    message = "Something went wrong while loading the data.",
    onRetry,
}) {

    return (
        <div
            className="
                flex
                min-h-[220px]
                items-center
                justify-center
                rounded-2xl
                border
                border-red-100
                bg-white
                p-6
            "
        >

            <div className="text-center">

                <div
                    className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-red-50
                        text-red-500
                    "
                >
                    <FiAlertCircle size={22} />
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
                        mx-auto
                        mt-1
                        max-w-md
                        text-sm
                        text-slate-500
                    "
                >
                    {message}
                </p>


                {onRetry && (

                    <button
                        type="button"
                        onClick={onRetry}
                        className="
                            mt-4
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-brand-green
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:brightness-95
                        "
                    >

                        <FiRefreshCw size={15} />

                        Try Again

                    </button>

                )}

            </div>

        </div>
    );
}


export default DashboardErrorState;