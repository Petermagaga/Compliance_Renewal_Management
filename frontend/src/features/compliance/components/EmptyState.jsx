import { FiFileText, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function EmptyState() {

    return (

        <div
            className="
                rounded-2xl
                border
                border-dashed
                border-gray-300
                bg-white
                py-20
                text-center
            "
        >

            <div
                className="
                    mx-auto
                    mb-6
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-brand-light
                    text-brand-green
                "
            >

                <FiFileText size={36} />

            </div>

            <h2 className="text-2xl font-bold text-gray-900">

                No Compliance Items

            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">

                You haven't created any compliance records yet.
                Start by adding your first license, permit,
                certificate or renewal.

            </p>

            <Link
                to="/add-item"
                className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-brand-green
                    px-6
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-lg
                "
            >

                <FiPlus />

                Add Compliance

            </Link>

        </div>

    );

}

export default EmptyState;