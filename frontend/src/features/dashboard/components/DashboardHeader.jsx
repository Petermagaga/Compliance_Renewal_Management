import { FiRefreshCw } from "react-icons/fi";
import { useDashboard } from "../context/DashboardContext";

function DashboardHeader() {

    const {
        loading,
        refresh,
    } = useDashboard();

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            {/* Left Side */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">

                    Compliance Dashboard

                </h1>

                <p className="text-gray-500 mt-1">

                    Monitor compliance health, upcoming renewals and recent activity.

                </p>

            </div>

            {/* Right Side */}

            <button

                onClick={refresh}

                disabled={loading}

                className="
                    flex
                    items-center
                    gap-2
                    px-5
                    py-3
                    rounded-lg
                    bg-brand-green
                    text-white
                    hover:opacity-90
                    disabled:opacity-50
                    transition
                "

            >

                <FiRefreshCw
                    className={loading ? "animate-spin" : ""}
                />

                {loading
                    ? "Refreshing..."
                    : "Refresh Dashboard"}

            </button>

        </div>

    );

}

export default DashboardHeader;