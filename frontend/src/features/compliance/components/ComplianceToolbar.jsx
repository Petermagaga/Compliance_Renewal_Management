import ComplianceSearch from "./ComplianceSearch";
import ComplianceFilters from "./ComplianceFilters";

import { useComplianceFilters } from "../context/ComplianceFilterContext";

function ComplianceToolbar() {

    const { clearFilters } = useComplianceFilters();

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                space-y-5
            "
        >

            {/* Heading */}

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-gray-900">
                        Search & Filters
                    </h3>

                    <p className="text-sm text-gray-500">
                        Quickly locate compliance records.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        hover:bg-gray-100
                        transition
                    "
                >
                    Clear Filters
                </button>

            </div>

            {/* Search */}

            <ComplianceSearch />

            {/* Filters */}

            <ComplianceFilters />

        </div>

    );

}

export default ComplianceToolbar;