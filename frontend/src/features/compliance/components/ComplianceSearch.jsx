import { FiSearch, FiX } from "react-icons/fi";

import { useComplianceFilters } from "../context/ComplianceFilterContext";


function ComplianceSearch() {

    const {
        search,
        setSearch,
    } = useComplianceFilters();

    const clearSearch = () => {
        setSearch("");
    };

    return (

        <div className="relative w-full lg:max-w-md">

            <FiSearch
                size={18}
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                "
            />

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search compliance items..."
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-11
                    pr-11
                    text-sm
                    outline-none
                    transition
                    focus:border-brand-green
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            />

            {search && (

                <button
                    type="button"
                    onClick={clearSearch}
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-full
                        p-1
                        text-gray-400
                        hover:bg-gray-100
                        hover:text-gray-600
                    "
                >
                    <FiX size={16}/>
                </button>

            )}

        </div>

    );

}

export default ComplianceSearch;