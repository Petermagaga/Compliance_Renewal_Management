import {
    FiCheckCircle,
    FiCircle,
} from "react-icons/fi";

const workflow = [
    "submitted",
    "approved",
    "active",
    "expiring",
    "expired",
    "archived",
];

function formatLabel(status) {

    return status
        .replace("_", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());

}

function WorkflowCard({ item }) {

    const currentIndex = workflow.indexOf(
        (item.status || "").toLowerCase()
    );

    return (

        <div
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >

            {/* Header */}

            <div className="border-b px-6 py-5">

                <h2 className="text-xl font-semibold">

                    Workflow

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Compliance lifecycle progress.

                </p>

            </div>

            {/* Timeline */}

            <div className="p-6">

                <div className="space-y-0">

                    {workflow.map((step, index) => {

                        const completed =
                            index < currentIndex;

                        const current =
                            index === currentIndex;

                        return (

                            <div
                                key={step}
                                className="flex"
                            >

                                {/* Left */}

                                <div
                                    className="
                                        mr-5
                                        flex
                                        flex-col
                                        items-center
                                    "
                                >

                                    {completed ? (

                                        <FiCheckCircle
                                            className="
                                                text-green-600
                                            "
                                            size={22}
                                        />

                                    ) : current ? (

                                        <div
                                            className="
                                                h-5
                                                w-5
                                                rounded-full
                                                border-4
                                                border-brand-green
                                            "
                                        />

                                    ) : (

                                        <FiCircle
                                            className="
                                                text-gray-300
                                            "
                                            size={20}
                                        />

                                    )}

                                    {index !== workflow.length - 1 && (

                                        <div
                                            className="
                                                mt-1
                                                h-10
                                                w-px
                                                bg-gray-200
                                            "
                                        />

                                    )}

                                </div>

                                {/* Right */}

                                <div className="pb-8">

                                    <h3
                                        className={`
                                            font-semibold
                                            ${
                                                current
                                                    ? "text-brand-green"
                                                    : completed
                                                    ? "text-gray-900"
                                                    : "text-gray-400"
                                            }
                                        `}
                                    >

                                        {formatLabel(step)}

                                    </h3>

                                    <p
                                        className={`
                                            mt-1
                                            text-sm
                                            ${
                                                current
                                                    ? "text-brand-green"
                                                    : "text-gray-500"
                                            }
                                        `}
                                    >

                                        {completed
                                            ? "Completed"
                                            : current
                                            ? "Current stage"
                                            : "Pending"}

                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>

    );

}

export default WorkflowCard;