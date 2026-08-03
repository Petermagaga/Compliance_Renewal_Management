import NotificationSearch from "./NotificationSearch";
import NotificationFilters from "./NotificationFilters";

function NotificationToolbar({
    search,
    onSearch,
    activeFilter,
    onFilterChange,
    children,
}) {

    return (

        <div
            className="
                mb-8
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                <NotificationSearch
                    value={search}
                    onChange={onSearch}
                />

                <NotificationFilters
                    activeFilter={activeFilter}
                    onChange={onFilterChange}
                />

                {children}

            </div>

        </div>

    );

}

export default NotificationToolbar;