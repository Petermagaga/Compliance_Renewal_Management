import { FiCheck, FiTrash2 } from "react-icons/fi";

import NotificationSearch from "./NotificationSearch";
import NotificationFilters from "./NotificationFilters";

function NotificationToolbar({
    search,
    onSearch,
    activeFilter,
    onFilterChange,
    sort,
    onSortChange,
    onMarkAllRead,
    onClearRead,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                space-y-5
            "
        >
            {/* Top row */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                <NotificationSearch
                    value={search}
                    onChange={onSearch}
                />

                <div className="flex gap-3">
                    <button
                        onClick={onMarkAllRead}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            px-4
                            py-2
                            text-sm
                            font-medium
                            hover:bg-slate-50
                            transition
                        "
                    >
                        <FiCheck size={16} />
                        Mark All Read
                    </button>

                    <button
                        onClick={onClearRead}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-red-200
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-red-600
                            hover:bg-red-50
                            transition
                        "
                    >
                        <FiTrash2 size={16} />
                        Clear Read
                    </button>
                </div>
            </div>

            {/* Bottom row */}

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                <NotificationFilters
                    activeFilter={activeFilter}
                    onChange={onFilterChange}
                />

                <select
                    value={sort}
                    onChange={(e) =>
                        onSortChange(e.target.value)
                    }
                    className="
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-2
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-brand-green
                    "
                >
                    <option value="newest">
                        Newest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                    <option value="unread">
                        Unread First
                    </option>
                </select>
            </div>
        </div>
    );
}

export default NotificationToolbar;