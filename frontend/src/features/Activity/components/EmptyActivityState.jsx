import { FiActivity } from "react-icons/fi";

function EmptyActivityState() {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-gray-300
                bg-gray-50
                py-16
                px-6
                text-center
            "
        >

            {/* Icon */}

            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-brand-green/10
                    text-brand-green
                "
            >

                <FiActivity size={30} />

            </div>

            {/* Heading */}

            <h3
                className="
                    mt-6
                    text-xl
                    font-semibold
                    text-gray-900
                "
            >

                No recent activity

            </h3>

            {/* Description */}

            <p
                className="
                    mt-2
                    max-w-sm
                    text-sm
                    leading-6
                    text-gray-500
                "
            >

                Compliance events, reminders, approvals,
                renewals and notifications will appear
                here once your team start working.

            </p>

        </div>

    );

}

export default EmptyActivityState;