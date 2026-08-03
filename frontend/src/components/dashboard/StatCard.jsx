function StatCard({
    title,
    value,
    subtitle,
    icon,
    color = "bg-brand-green",
}) {
    return (
        <article
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
            "
        >
            <div className="flex items-start justify-between gap-6">

                <div className="min-w-0 flex-1">

                    <p
                        className="
                            text-sm
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-500
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            mt-3
                            text-5xl
                            font-bold
                            leading-none
                            tracking-tight
                            text-slate-900
                        "
                    >
                        {value}
                    </h2>

                    {subtitle && (
                        <p
                            className="
                                mt-3
                                text-sm
                                text-slate-500
                            "
                        >
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`
                        ${color}
                        flex
                        h-12
                        w-12
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-full
                        shadow-sm
                    `}
                >
                    {icon}
                </div>

            </div>
        </article>
    );
}

export default StatCard;