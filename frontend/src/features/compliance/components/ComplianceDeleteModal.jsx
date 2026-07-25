import { FiAlertTriangle } from "react-icons/fi";

function ComplianceDeleteModal({

    item,

    open,

    loading,

    onClose,

    onConfirm,

}) {

    if (!open) return null;

    return (

        <div
            className="
                fixed inset-0
                bg-black/40
                flex items-center justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-xl
                    w-full
                    max-w-lg
                    p-8
                "
            >

                <div className="flex items-center gap-3 mb-5">

                    <FiAlertTriangle
                        className="text-red-500"
                        size={28}
                    />

                    <h2 className="text-2xl font-bold">

                        Delete Compliance Item

                    </h2>

                </div>

                <p className="text-gray-600">

                    You are about to permanently delete

                </p>

                <div
                    className="
                        bg-gray-100
                        rounded-lg
                        p-4
                        my-5
                    "
                >

                    <h3 className="font-semibold">

                        {item?.name}

                    </h3>

                    <p className="text-sm text-gray-600">

                        {item?.category}

                    </p>

                </div>

                <p className="text-red-600 text-sm">

                    This action cannot be undone.

                </p>

                <div
                    className="
                        flex
                        justify-end
                        gap-4
                        mt-8
                    "
                >

                    <button

                        onClick={onClose}

                        className="
                            px-5
                            py-2
                            rounded-lg
                            border
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        disabled={loading}

                        className="
                            bg-red-600
                            text-white
                            px-6
                            py-2
                            rounded-lg
                        "

                    >

                        {

                            loading

                            ?

                            "Deleting..."

                            :

                            "Delete"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ComplianceDeleteModal;