import { Link } from "react-router-dom";
import {
    FiPlus,
    FiArrowRight,
    FiShield,
} from "react-icons/fi";

function DashboardHeader() {

    return (
        <header
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                px-6
                py-7
                shadow-sm
                sm:px-8
                lg:px-10
                lg:py-9
            "
        >

            {/* Subtle background accent */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-brand-green/5
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    flex
                    flex-col
                    gap-7
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Heading */}

                <div className="max-w-3xl">

                    <div
                        className="
                            mb-3
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-green-50
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-brand-green
                        "
                    >

                        <FiShield size={14} />

                        Compliance Overview

                    </div>


                    <h1
                        className="
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-4xl
                        "
                    >
                        Compliance Dashboard
                    </h1>


                    <p
                        className="
                            mt-3
                            max-w-2xl
                            text-sm
                            leading-6
                            text-slate-500
                            sm:text-base
                        "
                    >
                        Monitor compliance health, upcoming renewals,
                        critical risks and recent operational activity
                        from one workspace.
                    </p>

                </div>


                {/* Actions */}

                <div
                    className="
                        flex
                        w-full
                        flex-col
                        gap-3
                        sm:w-auto
                        sm:flex-row
                    "
                >

                    <Link
                        to="/compliance"
                        className="
                            inline-flex
                            items-center
                            justify-center
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
                            transition
                            hover:border-slate-300
                            hover:bg-slate-50
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
                            justify-center
                            gap-2
                            rounded-xl
                            bg-brand-green
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:brightness-95
                            active:scale-[0.98]
                        "
                    >
                        <FiPlus size={17} />

                        Add Compliance

                    </Link>

                </div>

            </div>

        </header>
    );
}

export default DashboardHeader;