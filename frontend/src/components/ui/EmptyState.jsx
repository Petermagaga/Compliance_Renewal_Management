import { FiInbox } from "react-icons/fi";

function EmptyState({
    title = "Nothing to show",
    message = "There is no data available yet.",
    action = null,
}) {
    return (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <FiInbox
                    size={22}
                    className="text-slate-400"
                />
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
                {message}
            </p>

            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}

        </div>
    );
}

export default EmptyState;