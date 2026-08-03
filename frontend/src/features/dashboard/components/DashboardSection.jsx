function DashboardSection({
    title,
    subtitle,
    action,
    children,
}) {
    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
            "
        >
            <div
                className="
                    flex
                    items-start
                    justify-between
                    border-b
                    border-gray-100
                    px-6
                    py-5
                "
            >
                <div>
                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-gray-900
                        "
                    >
                        {title}
                    </h2>

                    {subtitle && (
                        <p
                            className="
                                mt-1
                                text-sm
                                text-gray-500
                            "
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {action && <div>{action}</div>}
            </div>

            <div className="p-6">
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;