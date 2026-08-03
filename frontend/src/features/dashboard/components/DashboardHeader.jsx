import { Link } from "react-router-dom";
import {
    FiPlus,
    FiArrowRight,
} from "react-icons/fi";



function DashboardHeader() {
    return (
        <div
            className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-end
                lg:justify-between
            "
        >

            <div>

                <p
                    className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-wider
                        text-brand-green
                    "

                >
                    Overview
                </p>

                <h1
                    className="
                        mt-1
                        text-3xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        lg:text-4xl
                    "
                >
                    
                Compliance Dashboard

                Monitor licenses, permits, certificates and insurance
                from one workspace.

                </h1>

                <p
                    className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-slate-500
                        lg:text-base
                    "
                >
                    Monitor compliance health, upcoming renewals,
                    critical risks and recent operational activity.
                </p>

            </div>

            <div className="flex flex-wrap gap-3">

                <Link
                    to="/compliance"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-slate-700
                        shadow-sm
                        transition
                        hover:border-brand-green
                        hover:text-brand-green
                    "
                >
                    View Compliance
                    <FiArrowRight size={16} />
                </Link>

                <Link
                    to="/add-item"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-brand-green
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:brightness-95
                    "
                >
                    <FiPlus size={17} />
                    Add Compliance
                </Link>

            </div>

        </div>
    );
}

export default DashboardHeader;