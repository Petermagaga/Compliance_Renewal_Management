function DashboardSection({
    title,
    subtitle,
    action,
    children,
    className = "",
}) {
    return (
        <section
            className={`
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                ${className}
            `}
        >
            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    border-b
                    border-slate-100
                    px-6
                    py-5
                "
            >
                <div className="min-w-0">

                    <h2
                        className="
                            text-lg
                            font-semibold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        {title}
                    </h2>

                    {subtitle && (
                        <p
                            className="
                                mt-1
                                text-sm
                                leading-5
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

            <div className="px-6 py-6">
                {children}
            </div>
        </section>
    );
}

export default DashboardSection;

