function NotificationSkeleton() {

    return (

        <div className="space-y-4 p-5">

            {[1,2,3,4].map(item => (

                <div
                    key={item}
                    className="
                        flex
                        gap-3
                        animate-pulse
                    "
                >

                    <div
                        className="
                            h-10
                            w-10
                            rounded-full
                            bg-slate-200
                        "
                    />

                    <div className="flex-1">

                        <div
                            className="
                                h-4
                                w-40
                                rounded
                                bg-slate-200
                            "
                        />

                        <div
                            className="
                                mt-2
                                h-3
                                w-full
                                rounded
                                bg-slate-100
                            "
                        />

                        <div
                            className="
                                mt-2
                                h-3
                                w-20
                                rounded
                                bg-slate-100
                            "
                        />

                    </div>

                </div>

            ))}

        </div>

    );

}

export default NotificationSkeleton;