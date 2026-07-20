import { useDashboard } from "../context/DashboardContext";

function DashboardHeader() {

    const { refresh, loading } = useDashboard();

    return (

        <div className="flex justify-between items-center mb-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Dashboard

                </h1>

                <p className="text-gray-500 mt-1">

                    Executive compliance overview

                </p>

            </div>

            <button

                onClick={refresh}

                disabled={loading}

                className="
                    px-4
                    py-2
                    rounded-lg
                    bg-brand-green
                    text-white
                "

            >

                Refresh

            </button>

        </div>

    );

}

export default DashboardHeader;