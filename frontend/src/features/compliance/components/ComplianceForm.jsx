import { useState } from "react";

import FormSection from "./forms/FormSection";
import FormInput from "./forms/FormInput";
import FormSelect from "./forms/FormSelect";

function ComplianceForm({
    mode = "create",
    initialData = {},
    onSubmit,
}) {

    const [formData, setFormData] = useState({

        company: initialData.company ?? 1,

        department: initialData.department ?? 1,

        name: initialData.name ?? "",

        category: initialData.category ?? "license",

        issue_date: initialData.issue_date ?? "",

        expiry_date: initialData.expiry_date ?? "",

        responsible_person:
            initialData.responsible_person ?? "",

        status: initialData.status ?? "active",

        priority: initialData.priority ?? "medium",

    });

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]: value,

        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSubmitting(true);

        try {

            await onSubmit(formData);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to save the compliance item."
            );

        } finally {

            setSubmitting(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">

                        {mode === "edit"
                            ? "Edit Compliance Item"
                            : "Add Compliance Item"}

                    </h1>

                    <p className="mt-1 text-gray-500">

                        {mode === "edit"
                            ? "Update the compliance record."
                            : "Register a new compliance record."}

                    </p>

                </div>


                {/* Error */}

                {error && (

                    <div
                        className="
                            mb-6
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            p-4
                            text-sm
                            text-red-700
                        "
                    >

                        {error}

                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* General Information */}

                    <FormSection
                        title="General Information"
                        description="Basic information about this compliance item."
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormInput
                                label="Compliance Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Business License"
                                required
                            />

                            <FormSelect
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "license",
                                        label: "License",
                                    },
                                    {
                                        value: "permit",
                                        label: "Permit",
                                    },
                                    {
                                        value: "certificate",
                                        label: "Certificate",
                                    },
                                    {
                                        value: "registration",
                                        label: "Registration",
                                    },
                                ]}
                            />

                        </div>

                    </FormSection>


                    {/* Dates */}

                    <FormSection
                        title="Compliance Dates"
                        description="Define when the compliance item was issued and when it expires."
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormInput
                                type="date"
                                label="Issue Date"
                                name="issue_date"
                                value={formData.issue_date}
                                onChange={handleChange}
                                required
                            />

                            <FormInput
                                type="date"
                                label="Expiry Date"
                                name="expiry_date"
                                value={formData.expiry_date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </FormSection>


                    {/* Ownership */}

                    <FormSection
                        title="Ownership"
                        description="Identify the department and person responsible for this compliance item."
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormInput
                                label="Company ID"
                                name="company"
                                type="number"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />

                            <FormInput
                                label="Department ID"
                                name="department"
                                type="number"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />

                            <FormInput
                                label="Responsible Person"
                                name="responsible_person"
                                value={formData.responsible_person}
                                onChange={handleChange}
                                placeholder="Responsible person"
                                required
                            />

                        </div>

                    </FormSection>


                    {/* Status */}

                    <FormSection
                        title="Status & Priority"
                        description="Set the current state and importance of this compliance item."
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormSelect
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "active",
                                        label: "Active",
                                    },
                                    {
                                        value: "expiring",
                                        label: "Expiring",
                                    },
                                    {
                                        value: "expired",
                                        label: "Expired",
                                    },
                                ]}
                            />

                            <FormSelect
                                label="Priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "low",
                                        label: "Low",
                                    },
                                    {
                                        value: "medium",
                                        label: "Medium",
                                    },
                                    {
                                        value: "high",
                                        label: "High",
                                    },
                                    {
                                        value: "critical",
                                        label: "Critical",
                                    },
                                ]}
                            />

                        </div>

                    </FormSection>


                    {/* Actions */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                            shadow-sm
                        "
                    >

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="
                                rounded-xl
                                border
                                border-gray-300
                                px-5
                                py-3
                                font-medium
                                text-gray-700
                                hover:bg-gray-50
                            "
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                                rounded-xl
                                bg-brand-green
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:opacity-90
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {submitting
                                ? "Saving..."
                                : mode === "edit"
                                    ? "Update Compliance"
                                    : "Save Compliance"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ComplianceForm;