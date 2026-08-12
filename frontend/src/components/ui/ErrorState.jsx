import {
    FiAlertCircle,
    FiRefreshCw,
} from "react-icons/fi";

function ErrorState({
    title = "Something went wrong",
    message = "We couldn't load this information.",
    onRetry,
}) {
    return (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/40 p-8 text-center">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <FiAlertCircle
                    size={22}
                    className="text-red-500"
                />
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
                {message}
            </p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-slate-800
                    "
                >
                    <FiRefreshCw size={15} />
                    Try Again
                </button>
            )}

        </div>
    );
}

export default ErrorState;