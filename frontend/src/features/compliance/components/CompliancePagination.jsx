import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

function CompliancePagination({
    page,
    totalPages,
    onPageChange,
}) {

    if (totalPages <= 1) {
        return null;
    }

    return (

        <div
            className="
                mt-6
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                bg-white
                px-5
                py-4
            "
        >

            <button
                type="button"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    hover:bg-gray-50
                "
            >
                <FiChevronLeft />
                Previous
            </button>

            <div className="flex items-center gap-2">

                {Array.from(
                    { length: totalPages },
                    (_, index) => {

                        const current = index + 1;

                        return (

                            <button
                                key={current}
                                type="button"
                                onClick={() => onPageChange(current)}
                                className={`
                                    h-10
                                    w-10
                                    rounded-lg
                                    text-sm
                                    font-semibold
                                    transition
                                    ${
                                        current === page
                                            ? "bg-brand-green text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                    }
                                `}
                            >
                                {current}
                            </button>

                        );

                    }
                )}

            </div>

            <button
                type="button"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    hover:bg-gray-50
                "
            >
                Next
                <FiChevronRight />
            </button>

        </div>

    );

}

export default CompliancePagination;