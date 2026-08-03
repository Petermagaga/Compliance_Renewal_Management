import { FiSearch, FiX } from "react-icons/fi";

function NotificationSearch({
    value,
    onChange,
}) {

    return (

        <div className="relative flex-1 min-w-[260px]">

            <FiSearch
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                "
                size={18}
            />

            <input
                type="text"
                placeholder="Search notifications..."
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-11
                    pr-10
                    text-sm
                    outline-none
                    transition
                    focus:border-brand-green
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            />

            {value && (

                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-full
                        p-1
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-600
                    "
                >
                    <FiX size={16} />
                </button>

            )}

        </div>

    );

}

export default NotificationSearch;