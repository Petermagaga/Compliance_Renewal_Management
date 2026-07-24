import { FiSearch } from "react-icons/fi";

function ComplianceToolbar() {


    const {

        search,

        status,

        category,

        priority,

        department,

        setSearch,

        setStatus,

        setCategory,

        setPriority,

        setDepartment,

        clearFilters,

    } = useComplianceFilters();


    return (

        <div className="bg-white rounded-xl shadow p-4 mb-6 flex gap-4">

            <div className="relative flex-1">

                <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                placeholder="Search..."

            />

            </div>

            <select

                value={status}

                onChange={(e) => setStatus(e.target.value)}

            >

                <option value="">All Status</option>

                <option value="active">

                    Active

                </option>

                <option value="expiring">

                    Expiring

                </option>

                <option value="expired">

                    Expired

                </option>

            </select>

            <select

                value={priority}

                onChange={(e) =>

                    setPriority(e.target.value)

                }

            >

                <option value="">

                    All Priorities

                </option>

                <option value="low">

                    Low

                </option>

                <option value="medium">

                    Medium

                </option>

                <option value="high">

                    High

                </option>

                <option value="critical">

                    Critical

                </option>

            </select>

        <button

            onClick={clearFilters}

        >

            Reset Filters

        </button>

        </div>

    );

}

export default ComplianceToolbar;