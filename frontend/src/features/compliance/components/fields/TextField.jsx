function TextField({

    label,

    name,

    value,

    onChange,

    placeholder,

}) {

    return (

        <div>

            <label

                className="block mb-2 font-semibold"

            >

                {label}

            </label>

            <input

                type="text"

                name={name}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                className="w-full border rounded-lg p-3"

            />

        </div>

    );

}

export default TextField;