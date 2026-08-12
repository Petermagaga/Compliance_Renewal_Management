import { FiLoader } from "react-icons/fi";

function LoadingState({
    title = "Loading...",
    message = "Please wait while we load your data.",
}) {
    return (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FiLoader
                    size={22}
                    className="animate-spin text-brand-green"
                />
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
                {message}
            </p>

        </div>
    );
}

export default LoadingState;