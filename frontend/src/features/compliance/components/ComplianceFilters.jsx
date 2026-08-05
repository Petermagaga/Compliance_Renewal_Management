import { useMemo } from "react";
import { FiFilter, FiRotateCcw } from "react-icons/fi";

import { useComplianceFilters } from "../context/ComplianceFilterContext";
import { useCompliance } from "../hooks/useCompliance";

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

    const { items } = useCompliance();

    // Format labels nicely
    function label(text) {
        return text
            ?.toString()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Dynamic filter values
    const statuses = useMemo(
        () => [...new Set(items.map((item) => item.status).filter(Boolean))],
        [items]
    );

    const priorities = useMemo(
        () => [...new Set(items.map((item) => item.priority).filter(Boolean))],
        [items]
    );

    const categories = useMemo(
        () => [...new Set(items.map((item) => item.category).filter(Boolean))],
        [items]
    );

    const departments = useMemo(
        () =>
            [
                ...new Set(
                    items
                        .map(
                            (item) =>
                                item.department_name ??
                                item.department
                        )
                        .filter(Boolean)
                ),
            ],
        [items]
    );

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

                {statuses.map((statusValue) => (
                    <option
                        key={statusValue}
                        value={statusValue}
                    >
                        {label(statusValue)}
                    </option>
                ))}
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

                {priorities.map((priorityValue) => (
                    <option
                        key={priorityValue}
                        value={priorityValue}
                    >
                        {label(priorityValue)}
                    </option>
                ))}
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

                {categories.map((categoryValue) => (
                    <option
                        key={categoryValue}
                        value={categoryValue}
                    >
                        {label(categoryValue)}
                    </option>
                ))}
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

                {departments.map((departmentValue) => (
                    <option
                        key={departmentValue}
                        value={departmentValue}
                    >
                        {label(departmentValue)}
                    </option>
                ))}
            </select>

            {/* Reset */}
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