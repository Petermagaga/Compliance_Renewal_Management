import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import AddComplianceButton from "./AddComplianceButton";

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

            <AddComplianceButton />

        </div>

    );

}

export default ComplianceHeader;