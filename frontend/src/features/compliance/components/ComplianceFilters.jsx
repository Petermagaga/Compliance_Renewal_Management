import { FiFilter, FiRotateCcw } from "react-icons/fi";

import { useComplianceFilters } from "../context/ComplianceFilterContext";

function ComplianceFilters() {

    const {

        status,
        priority,
        category,
        department,

        setStatus,
        setPriority,
        setCategory,
        setDepartment,

        clearFilters,

    } = useComplianceFilters();

    return (

        <div
            className="
                flex
                flex-wrap
                items-center
                gap-3
            "
        >

            {/* Filter Label */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-gray-600
                "
            >

                <FiFilter />

                Filters

            </div>

            {/* Status */}

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    focus:border-brand-green
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            >

                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring</option>
                <option value="expired">Expired</option>
                <option value="renewed">Renewed</option>

            </select>

            {/* Priority */}

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    focus:border-brand-green
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            >

                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>

            </select>

            {/* Category */}

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    focus:border-brand-green
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            >

                <option value="">All Categories</option>
                <option value="license">License</option>
                <option value="permit">Permit</option>
                <option value="certificate">Certificate</option>
                <option value="registration">Registration</option>

            </select>

            {/* Department */}

            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    focus:border-brand-green
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            >

                <option value="">All Departments</option>
                <option value="administration">
                    Administration
                </option>
                <option value="finance">
                    Finance
                </option>
                <option value="operations">
                    Operations
                </option>
                <option value="quality">
                    Quality
                </option>

            </select>

            {/* Clear */}

            <button
                type="button"
                onClick={clearFilters}
                className="
                    ml-auto
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-50
                "
            >

                <FiRotateCcw size={16} />

                Reset

            </button>

        </div>

    );

}

export default ComplianceFilters;