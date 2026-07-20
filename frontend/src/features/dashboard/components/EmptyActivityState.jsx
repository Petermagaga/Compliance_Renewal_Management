import {

    FiInbox,

} from "react-icons/fi";

function EmptyActivityState() {

    return (

        <div
            className="
                py-10
                text-center
            "
        >

            <FiInbox
                className="
                    mx-auto
                    text-5xl
                    text-gray-300
                "
            />

            <h3
                className="
                    mt-4
                    text-lg
                    font-semibold
                "
            >

                No Recent Activity

            </h3>

            <p
                className="
                    text-gray-500
                    mt-2
                "
            >

                Activity will appear here as users
                interact with the compliance system.

            </p>

        </div>

    );

}

export default EmptyActivityState;