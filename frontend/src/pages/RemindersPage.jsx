import {
    FiRefreshCw,
    FiBell,
} from "react-icons/fi";

import MainLayout
    from "../components/layout/MainLayout";

import ReminderList
    from "../features/reminders/components/ReminderList";

import useReminders
    from "../features/reminders/hooks/useReminders";


function RemindersPage() {

    const {
        reminders,
        loading,
        error,
        refresh,
    } = useReminders();


    return (

        <MainLayout>

            <main
                className="
                    min-h-screen
                    bg-slate-50
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-7xl
                        px-6
                        py-8
                    "
                >

                    {/* Header */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-brand-green
                                "
                            >

                                <FiBell size={16} />

                                Renewal Center

                            </div>


                            <h1
                                className="
                                    mt-2
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Reminders
                            </h1>


                            <p
                                className="
                                    mt-2
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Track upcoming compliance renewals
                                and items that require attention.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={refresh}
                            disabled={loading}
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
                                shadow-sm
                                transition
                                hover:border-brand-green
                                hover:text-brand-green
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <FiRefreshCw
                                size={16}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh

                        </button>

                    </div>


                    {/* Error */}

                    {error && (

                        <div
                            className="
                                mt-6
                                rounded-2xl
                                border
                                border-red-200
                                bg-red-50
                                px-5
                                py-4
                                text-sm
                                text-red-700
                            "
                        >
                            Unable to load reminders.
                            Please try refreshing.
                        </div>

                    )}


                    {/* Content */}

                    <section className="mt-8">

                        <ReminderList
                            reminders={reminders}
                            loading={loading}
                        />

                    </section>

                </div>

            </main>

        </MainLayout>

    );
}

export default RemindersPage;