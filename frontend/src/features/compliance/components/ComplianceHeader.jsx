import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

function ComplianceHeader() {

    return (

        <div className="flex justify-between items-center mb-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Compliance Workspace

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage licenses, permits, certificates and renewals.

                </p>

            </div>

            <Link

                to="/add-item"

                className="bg-brand-green text-white px-5 py-3 rounded-lg flex items-center gap-2"

            >

                <FiPlus />

                Add Compliance

            </Link>

        </div>

    );

}

export default ComplianceHeader;