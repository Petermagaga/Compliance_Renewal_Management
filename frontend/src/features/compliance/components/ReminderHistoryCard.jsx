import {
    FiMail,
    FiMessageCircle,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";

function ReminderHistoryCard({

    reminders = [],

}) {

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

            <div className="border-b p-6">

                <h2 className="text-lg font-bold">

                    Reminder History

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Notifications sent for this compliance item.

                </p>

            </div>

            <div className="divide-y">

                {

                    reminders.length === 0 ? (

                        <div className="p-8 text-center text-gray-500">

                            No reminders have been sent.

                        </div>

                    ) : (

                        reminders.map(reminder => (

                            <div
                                key={reminder.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    p-5
                                "
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-brand-green/10
                                            text-brand-green
                                        "
                                    >

                                        {

                                            reminder.channel === "email"

                                                ? <FiMail />

                                                : <FiMessageCircle />

                                        }

                                    </div>

                                    <div>

                                        <p className="font-semibold">

                                            {reminder.channel}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {reminder.sent_at}

                                        </p>

                                    </div>

                                </div>

                                <div>

                                    {

                                        reminder.status === "sent"

                                            ? (

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-full
                                                        bg-green-100
                                                        px-3
                                                        py-1
                                                        text-sm
                                                        font-medium
                                                        text-green-700
                                                    "
                                                >

                                                    <FiCheckCircle />

                                                    Sent

                                                </span>

                                            )

                                            : (

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        rounded-full
                                                        bg-red-100
                                                        px-3
                                                        py-1
                                                        text-sm
                                                        font-medium
                                                        text-red-700
                                                    "
                                                >

                                                    <FiXCircle />

                                                    Failed

                                                </span>

                                            )

                                    }

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default ReminderHistoryCard;