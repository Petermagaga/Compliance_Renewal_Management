import ReminderCard from "../../features/dashboard/components/ReminderCard";

function RemindersPanel({ items = [] }) {

    return (
        <div className="border-t border-slate-200 pt-6">

            <div className="mb-4">

                <h3 className="text-base font-semibold text-slate-900">
                    Upcoming Reminders
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Compliance items requiring attention soon.
                </p>

            </div>


            {items.length === 0 ? (

                <div
                    className="
                        rounded-xl
                        border
                        border-dashed
                        border-slate-200
                        bg-slate-50
                        px-6
                        py-8
                        text-center
                    "
                >
                    <p className="text-sm text-slate-500">
                        No upcoming reminders.
                    </p>
                </div>

            ) : (

                <div className="space-y-3">

                    {items.map((reminder, index) => (

                        <ReminderCard
                            key={reminder.id ?? index}
                            reminder={reminder}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default RemindersPanel;