function FormSelect({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    disabled = false,
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

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
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
                    disabled:bg-gray-100
                "
            >

                <option value="">
                    Select {label}
                </option>

                {options.map(option => (

                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>

                ))}

            </select>

        </div>
    );
}

export default FormSelect;