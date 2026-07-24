import { Link } from "react-router-dom";

import {

    FiArrowLeft,

    FiEdit,

} from "react-icons/fi";

function DetailHeader({ item }) {

    return (

        <div className="flex justify-between items-center">

            <div>

                <Link

                    to="/compliance"

                    className="text-brand-green flex items-center gap-2 mb-3"

                >

                    <FiArrowLeft />

                    Back to Compliance

                </Link>

                <h1 className="text-3xl font-bold">

                    {item.name}

                </h1>

                <p className="text-gray-500">

                    {item.category}

                </p>

            </div>

            <Link

                to={`/compliance/${item.id}/edit`}

                className="bg-brand-green text-white px-5 py-3 rounded-lg flex items-center gap-2"

            >

                <FiEdit />

                Edit Item

            </Link>

        </div>

    );

}

export default DetailHeader;