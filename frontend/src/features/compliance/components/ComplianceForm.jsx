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

        </form>

    );

}

export default ComplianceForm;