import ReminderCard from "./ReminderCard";
import ReminderSkeleton from "./ReminderSkeleton";
import EmptyReminderState from "./EmptyReminderState";


function ReminderList({
    reminders = [],
    loading,
}) {

    // ---------------------------------------
    // Loading
    // ---------------------------------------

    if (loading) {

        return (
            <ReminderSkeleton />
        );

    }


    // ---------------------------------------
    // Empty
    // ---------------------------------------

    if (reminders.length === 0) {

        return (
            <EmptyReminderState />
        );

    }


    // ---------------------------------------
    // Data
    // ---------------------------------------

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