import { Link } from "react-router-dom";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

function ActionButtons({

    item,
    onDelete,

}) {

    return (

        <div className="flex justify-end items-center gap-2">

            <Link
                to={`/compliance/${item.id}`}
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-blue-100
                    bg-blue-50
                    text-blue-600
                    transition
                    hover:bg-blue-100
                "
                title="View"
            >

                <FiEye size={16} />

            </Link>

            <Link
                to={`/compliance/${item.id}/edit`}
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-emerald-100
                    bg-emerald-50
                    text-emerald-600
                    transition
                    hover:bg-emerald-100
                "
                title="Edit"
            >

                <FiEdit2 size={16} />

            </Link>

            <button
                onClick={() => onDelete(item)}
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-red-100
                    bg-red-50
                    text-red-600
                    transition
                    hover:bg-red-100
                "
                title="Delete"
            >

                <FiTrash2 size={16} />

            </button>

        </div>

    );

}

export default ActionButtons;