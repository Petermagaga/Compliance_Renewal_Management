function FormSection({
    title,
    description,
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
                shadow-sm
            "
        >

            <div
                className="
                    border-b
                    border-slate-100
                    px-6
                    py-5
                "
            >

                <h2
                    className="
                        text-base
                        font-semibold
                        tracking-tight
                        text-slate-900
                    "
                >
                    {title}
                </h2>

                {description && (

                    <p
                        className="
                            mt-1.5
                            max-w-2xl
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        {description}
                    </p>

                )}

            </div>


            <div className="px-6 py-6">

                {children}

            </div>

        </section>
    );
}

export default FormSection;