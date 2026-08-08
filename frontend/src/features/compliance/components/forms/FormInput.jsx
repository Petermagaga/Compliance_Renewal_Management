function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    accept,
}) {

    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700"
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={type === "file" ? undefined : value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                accept={accept}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    focus:border-brand-green
                    focus:ring-2
                    focus:ring-brand-green/20
                "
            />

        </div>
    );
}

export default FormInput;