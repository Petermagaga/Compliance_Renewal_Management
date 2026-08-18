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
                border-slate-200
                bg-white
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-slate-100
                    px-6
                    py-4
                "
            >
                <div>
                    <h2
                        className="
                            text-base
                            font-semibold
                            text-slate-900
                        "
                    >
                        {title}
                    </h2>

                    {subtitle && (
                        <p
                            className="
                                mt-0.5
                                text-xs
                                text-slate-500
                            "
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {action && (
                    <div className="shrink-0">
                        {action}
                    </div>
                )}
            </div>

            <div className="p-5">
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;