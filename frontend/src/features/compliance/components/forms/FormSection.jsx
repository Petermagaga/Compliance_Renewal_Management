function FormSection({
    title,
    description,
    children,
}) {

    return (
        <section
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
            "
        >

            <div className="mb-6">

                <h2 className="text-lg font-bold text-gray-900">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                )}

            </div>

            {children}

        </section>
    );
}

export default FormSection;