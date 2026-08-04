import { FiBellOff } from "react-icons/fi";

function EmptyNotifications() {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                py-12
                text-center
            "
        >

            <FiBellOff
                size={42}
                className="text-slate-300"
            />

            <h4
                className="
                    mt-4
                    font-semibold
                    text-slate-700
                "
            >
                You're all caught up
            </h4>

            <p
                className="
                    mt-2
                    text-sm
                    text-slate-500
                "
            >
                New notifications will appear here.
            </p>

        </div>

    );

}

export default EmptyNotifications;