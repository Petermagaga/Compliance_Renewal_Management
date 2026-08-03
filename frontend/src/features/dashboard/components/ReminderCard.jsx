import { FiClock, FiMail } from "react-icons/fi";

function ReminderCard({ reminder }) {
    return (
        <div
            className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                transition
                duration-300
                hover:border-brand-green
                hover:bg-green-50
            "
        >
            <div className="flex items-start justify-between">

                <div>

                    <h3 className="font-semibold text-slate-900">
                        {reminder.compliance_item_name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                        <FiClock className="text-brand-green" />

                        <span>
                            Expires in {reminder.days_before}{" "}
                            {reminder.days_before === 1 ? "day" : "days"}
                        </span>

                    </div>

                </div>

                <span
                    className="
                        rounded-full
                        bg-green-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-green-700
                    "
                >
                    <FiMail className="inline mr-1" />
                    {reminder.channel}
                </span>

            </div>
        </div>
    );
}

export default ReminderCard;