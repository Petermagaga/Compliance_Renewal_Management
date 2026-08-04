function ActivitySkeleton() {

    return (

        <div
            className="
                relative
                max-h-[600px]
                overflow-hidden
            "
        >

            {

                [...Array(5)].map((_, index) => (

                    <div
                        key={index}
                        className="
                            relative
                            pl-12
                            pb-8
                            animate-pulse
                        "
                    >

                        {/* Timeline */}

                        {

                            index !== 4 && (

                                <div
                                    className="
                                        absolute
                                        left-[18px]
                                        top-8
                                        bottom-0
                                        w-px
                                        bg-gray-200
                                    "
                                />

                            )

                        }

                        {/* Timeline Dot */}

                        <div
                            className="
                                absolute
                                left-3
                                top-6
                                h-3
                                w-3
                                rounded-full
                                bg-gray-300
                                ring-4
                                ring-white
                            "
                        />

                        {/* Card */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                p-5
                            "
                        >

                            <div className="flex gap-4">

                                {/* Icon */}

                                <div
                                    className="
                                        h-11
                                        w-11
                                        rounded-full
                                        bg-gray-200
                                    "
                                />

                                <div className="flex-1">

                                    <div
                                        className="
                                            h-4
                                            w-1/3
                                            rounded
                                            bg-gray-200
                                        "
                                    />

                                    <div
                                        className="
                                            mt-3
                                            h-3
                                            w-3/4
                                            rounded
                                            bg-gray-100
                                        "
                                    />

                                    <div
                                        className="
                                            mt-6
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                h-10
                                                w-10
                                                rounded-full
                                                bg-gray-200
                                            "
                                        />

                                        <div className="flex-1">

                                            <div
                                                className="
                                                    h-3
                                                    w-32
                                                    rounded
                                                    bg-gray-200
                                                "
                                            />

                                            <div
                                                className="
                                                    mt-2
                                                    h-2
                                                    w-20
                                                    rounded
                                                    bg-gray-100
                                                "
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ActivitySkeleton;