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
                p-5
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p
                        className="
                            text-sm
                            font-medium
                            text-slate-500
                        "
                    >
                        {title}
                    </p>

                    <p
                        className="
                            mt-2
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        {value}
                    </p>

                    {subtitle && (
                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-400
                            "
                        >
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${color}
                    `}
                >
                    {icon}
                </div>

            </div>

        </article>
    );
}

export default StatCard;