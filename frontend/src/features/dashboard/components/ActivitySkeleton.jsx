function ActivitySkeleton() {

    return (

        <div className="space-y-4">

            {

                [...Array(5)].map((_, index) => (

                    <div
                        key={index}
                        className="
                            animate-pulse
                            border-b
                            pb-4
                        "
                    >

                        <div
                            className="
                                h-4
                                bg-gray-200
                                rounded
                                w-2/3
                                mb-2
                            "
                        />

                        <div
                            className="
                                h-3
                                bg-gray-100
                                rounded
                                w-full
                            "
                        />

                    </div>

                ))

            }

        </div>

    );

}

export default ActivitySkeleton;