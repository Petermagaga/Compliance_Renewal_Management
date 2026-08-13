import { FiBell } from "react-icons/fi";


function EmptyReminderState() {

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
                border-slate-300
                bg-white
                px-6
                py-16
                text-center
            "
        >

            <div
                className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                "
            >

                <FiBell size={24} />

            </div>

            <h3
                className="
                    mt-4
                    text-lg
                    font-semibold
                    text-slate-900
                "
            >
                No reminders
            </h3>

            <p
                className="
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    text-slate-500
                "
            >
                There are no upcoming compliance reminders
                requiring your attention right now.
            </p>

        </div>

    );
}

export default EmptyReminderState;