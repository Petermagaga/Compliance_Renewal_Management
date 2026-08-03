
import ReminderCard from "../../features/dashboard/components/ReminderCard";
function RemindersPanel({ items = [] }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
                Upcoming Reminders
            </h2>

            {items.length === 0 ? (

                <div className="py-10 text-center text-slate-500">
                    No upcoming reminders.
                </div>

            ) : (

                <div className="space-y-4">

                    {items.map((reminder) => (

                        <ReminderCard
                            key={reminder.id}
                            reminder={reminder}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default RemindersPanel;