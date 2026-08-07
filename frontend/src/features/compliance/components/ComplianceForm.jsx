import { useEffect, useState } from "react";

function ComplianceForm({

    mode = "create",

    initialValues = {},

    onSubmit,

}) {


    const [formData, setFormData] = useState({

        name: "",

        category: "",

        company: "",

        department: "",

        issue_date: "",

        expiry_date: "",

        renewal_period: "",

        responsible_person: "",

        reviewer: "",

        status: "draft",

        priority: "medium",

        email_reminder: true,

        whatsapp_reminder: false,

        reminder_days: 30,

        description: "",

        notes: "",

    });

    useEffect(() => {

        if (mode === "edit") {

            setForm({

                ...form,

                ...initialValues,

            });

        }

    }, [initialValues]);


    const handleChange = (event) => {

        const {

            name,

            value,

            type,

            checked,

        } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

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

    label="Priority"

    name="priority"

    value={form.priority}

    onChange={handleChange}

/>

<DateField

    label="Status"

    name="status"

    value={form.status}

    onChange={handleChange}

/>
        </form>

    );

}

export default ComplianceForm;