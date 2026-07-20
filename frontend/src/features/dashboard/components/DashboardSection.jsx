function DashboardSection({

    title,

    subtitle,

    action,

    children,

}) {

    return (

        <section
            className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-gray-100
                overflow-hidden
            "
        >

            {/* Header */}

            <div
                className="
                    flex
                    items-start
                    justify-between
                    px-6
                    py-4
                    border-b
                    border-gray-100
                "
            >

                <div>

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-gray-900
                        "
                    >

                        {title}

                    </h2>

                    {subtitle && (

                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >

                            {subtitle}

                        </p>

                    )}

                </div>

                {action && (

                    <div>

                        {action}

                    </div>

                )}

            </div>

            {/* Body */}

            <div className="p-6">

                {children}

            </div>

        </section>

    );

}

export default DashboardSection;