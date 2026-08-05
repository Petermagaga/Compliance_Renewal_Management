import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

function AddComplianceButton() {

    return (

        <Link
            to="/add-item"
            className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-brand-green
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:shadow-lg
            "
        >

            <FiPlus size={18} />

            Add Compliance

        </Link>

    );

}

export default AddComplianceButton;