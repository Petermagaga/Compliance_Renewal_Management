import ReminderCard from "./ReminderCard";
import ReminderSkeleton from "./ReminderSkeleton";
import EmptyReminderState from "./EmptyReminderState";


function ReminderList({
    reminders,
    loading,
}) {

    if (loading) {

        return (
            <ReminderSkeleton />
        );

    }


    if (!reminders.length) {

        return (
            <EmptyReminderState />
        );

    }


    return (

        <div className="space-y-4">

            {reminders.map((reminder) => (

                <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                />

            ))}

        </div>

    );
}

export default ReminderList;