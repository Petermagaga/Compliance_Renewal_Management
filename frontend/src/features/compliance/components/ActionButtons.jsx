import { Link } from "react-router-dom";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

function ActionButtons({

    id,

    onDelete,

}) {

    return (

        <div className="flex items-center justify-center gap-2">

            <Link

                to={`/compliance/${id}`}

                className="
                    p-2
                    rounded-lg
                    bg-blue-100
                    text-blue-600
                    hover:bg-blue-200
                "

            >

                <FiEye />

            </Link>

            <Link

                to={`/compliance/${id}/edit`}

                className="
                    p-2
                    rounded-lg
                    bg-green-100
                    text-green-600
                    hover:bg-green-200
                "

            >

                <FiEdit2 />

            </Link>

            <button

                onClick={() => onDelete(id)}

                className="
                    p-2
                    rounded-lg
                    bg-red-100
                    text-red-600
                    hover:bg-red-200
                "

            >

                <FiTrash2 />

            </button>

        </div>

    );

}

export default ActionButtons;