function SelectField({

    label,

    name,

    value,

    onChange,

    options,

}) {

    return (

        <div>

            <label className="block mb-2 font-semibold">

                {label}

            </label>

            <select

                name={name}

                value={value}

                onChange={onChange}

                className="w-full border rounded-lg p-3"

            >

                {

                    options.map(option => (

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}

export default SelectField;