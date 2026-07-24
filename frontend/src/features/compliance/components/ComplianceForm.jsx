import { useEffect, useState } from "react";

function ComplianceForm({

    mode = "create",

    initialValues = {},

    onSubmit,

}) {

    const [form, setForm] = useState({

        name: "",

        category: "",

        department: "",

        responsible_person: "",

        issue_date: "",

        expiry_date: "",

        priority: "medium",

        status: "active",

    });

    useEffect(() => {

        if (mode === "edit") {

            setForm({

                ...form,

                ...initialValues,

            });

        }

    }, [initialValues]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="space-y-6"

        >

            {/* Fields go here */}

<TextField

    label="Compliance Name"

    name="name"

    value={form.name}

    onChange={handleChange}

/>

<SelectField

    label="Category"

    name="category"

    value={form.category}

    onChange={handleChange}

    options={[

        {

            value: "license",

            label: "License",

        },

        {

            value: "certificate",

            label: "Certificate",

        },

        {

            value: "permit",

            label: "Permit",

        },

        {

            value: "insurance",

            label: "Insurance",

        },

    ]}

/>

<DateField

    label="Issue Date"

    name="issue_date"

    value={form.issue_date}

    onChange={handleChange}

/>

<DateField

    label="Expiry Date"

    name="expiry_date"

    value={form.expiry_date}

    onChange={handleChange}

/>

<DateField

    label="Expiry Date"

    name="expiry_date"

    value={form.expiry_date}

    onChange={handleChange}

/>

<DateField

    label="Expiry Date"

    name="expiry_date"

    value={form.expiry_date}

    onChange={handleChange}

/>

<DateField

    label="Expiry Date"

    name="expiry_date"

    value={form.expiry_date}

    onChange={handleChange}

/>
        </form>

    );

}

export default ComplianceForm;