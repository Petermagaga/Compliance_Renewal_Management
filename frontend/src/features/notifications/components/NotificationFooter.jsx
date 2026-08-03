import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function NotificationFooter() {

    return (

        <div
            className="
                border-t
                border-slate-200
                p-4
            "
        >

            <Link
                to="/notifications"
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    text-brand-green
                    transition
                    hover:underline
                "
            >

                View all notifications

                <FiArrowRight size={15} />

            </Link>

        </div>

    );

}

export default NotificationFooter;