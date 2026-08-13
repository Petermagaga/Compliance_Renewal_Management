function ReminderSkeleton() {

    return (

        <div className="space-y-4">

            {[1, 2, 3, 4].map((item) => (

                <div
                    key={item}
                    className="
                        animate-pulse
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                    "
                >

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex-1 space-y-3">

                            <div className="
                                h-5
                                w-48
                                rounded
                                bg-slate-200
                            " />

                            <div className="
                                h-4
                                w-72
                                max-w-full
                                rounded
                                bg-slate-100
                            " />

                            <div className="
                                h-4
                                w-56
                                rounded
                                bg-slate-100
                            " />

                        </div>

                        <div className="
                            h-8
                            w-20
                            rounded-full
                            bg-slate-200
                        " />

                    </div>

                </div>

            ))}

        </div>

    );
}

export default ReminderSkeleton;