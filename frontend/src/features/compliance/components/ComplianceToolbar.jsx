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

            <select className="border rounded-lg px-4">

                <option>Status</option>

            </select>

            <select className="border rounded-lg px-4">

                <option>Category</option>

            </select>

            <select className="border rounded-lg px-4">

                <option>Priority</option>

            </select>

        </div>

    );

}

export default ComplianceToolbar;