function DateField({

    label,

    name,

    value,

    onChange,

}) {

    return (

        <div>

            <label className="block mb-2 font-semibold">

                {label}

            </label>

            <input

                type="date"

                name={name}

                value={value}

                onChange={onChange}

                className="w-full border rounded-lg p-3"

            />

        </div>

    );

}

export default DateField;