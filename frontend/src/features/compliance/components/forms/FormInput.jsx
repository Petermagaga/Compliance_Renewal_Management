function FormInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    accept,
    disabled = false,
    min,
    max,
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


            {/* Input */}

            <input
                id={name}
                name={name}
                type={type}
                value={
                    type === "file"
                        ? undefined
                        : value
                }
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                accept={accept}
                disabled={disabled}
                min={min}
                max={max}
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

                    placeholder:text-slate-400

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
                                hover:border-slate-400
                                focus:border-brand-green
                                focus:ring-2
                                focus:ring-brand-green/20
                            `
                    }

                    ${
                        type === "file"
                            ? `
                                cursor-pointer
                                file:mr-4
                                file:rounded-lg
                                file:border-0
                                file:bg-slate-100
                                file:px-4
                                file:py-2
                                file:text-sm
                                file:font-medium
                                file:text-slate-700
                                hover:file:bg-slate-200
                            `
                            : ""
                    }
                `}
            />


            {/* Helper text */}

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

export default FormInput;