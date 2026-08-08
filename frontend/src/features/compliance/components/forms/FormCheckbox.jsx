function FormCheckbox({
    label,
    name,
    checked,
    onChange,
    disabled = false,
}) {

    return (

        <label className="flex items-center gap-3">

            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-brand-green
                    focus:ring-brand-green
                "
            />

            <span className="text-sm text-gray-700">
                {label}
            </span>

        </label>

    );

}

export default FormCheckbox;