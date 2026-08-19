function FormSelect({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    disabled = false,
    helperText,
    error,
}) {

    const hasError = Boolean(error);

    return (
        <div className="space-y-2">

            {/* Label */}

            <label
                htmlFor={name}
                className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                "
            >

                {label}

                {required && (
                    <span
                        className="
                            ml-1
                            text-red-500
                        "
                    >
                        *
                    </span>
                )}

            </label>


            {/* Select */}

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                aria-invalid={hasError}
                aria-describedby={
                    error
                        ? `${name}-error`
                        : helperText
                        ? `${name}-help`
                        : undefined
                }
                className={`
                    w-full
                    rounded-xl
                    border
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200

                    hover:border-slate-400

                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                    disabled:text-slate-400

                    ${
                        hasError
                            ? `
                                border-red-300
                                focus:border-red-500
                                focus:ring-2
                                focus:ring-red-500/10
                            `
                            : `
                                border-slate-300
                                focus:border-brand-green
                                focus:ring-2
                                focus:ring-brand-green/20
                            `
                    }
                `}
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


            {/* Helper */}

            {helperText && !error && (

                <p
                    id={`${name}-help`}
                    className="
                        text-xs
                        leading-5
                        text-slate-400
                    "
                >
                    {helperText}
                </p>

            )}


            {/* Error */}

            {error && (

                <p
                    id={`${name}-error`}
                    className="
                        text-xs
                        font-medium
                        text-red-600
                    "
                >
                    {error}
                </p>

            )}

        </div>
    );
}

export default FormSelect;