import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

function ComplianceHeader() {

    return (

        <div
            className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >

            <div>

                <p className="text-sm font-semibold text-brand-green uppercase tracking-wide">
                    Compliance Management
                </p>

                <h1 className="mt-2 text-4xl font-bold text-gray-900">
                    Compliance Workspace
                </h1>

                <p className="mt-3 max-w-2xl text-gray-500">
                    Manage licenses, permits, certificates and renewals
                    from one centralized workspace.
                </p>

            </div>

            <Link
                to="/add-item"
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-brand-green
                    px-6
                    py-3
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-lg
                "
            >

                <FiPlus size={18} />

                Add Compliance

            </Link>

        </div>

    );

}

export default ComplianceHeader;