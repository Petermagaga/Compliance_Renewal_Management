
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

    /*
     * Populate form when editing an existing compliance item
     */
    useEffect(() => {
        if (mode === "edit" && initialValues) {
            setFormData((previous) => ({
                ...previous,
                ...initialValues,
            }));
        }
    }, [mode, initialValues]);

    /*
     * Generic change handler
     *
     * Handles:
     * - text inputs
     * - select inputs
     * - number inputs
     * - checkboxes
     */
    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    /*
     * Submit form
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            {/* =====================================================
                PAGE HEADER
            ====================================================== */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {mode === "edit"
                            ? "Edit Compliance Item"
                            : "Add Compliance Item"}
                    </h1>

                    <p className="mt-1 text-gray-500">
                        {mode === "edit"
                            ? "Update the compliance document information."
                            : "Register a new compliance document."}
                    </p>
                </div>
            </div>

            {/* =====================================================
                GENERAL INFORMATION
            ====================================================== */}
            <FormSection
                title="General Information"
                description="Basic details about the compliance item."
            >
                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        label="Compliance Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <FormSelect
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={[
                            {
                                value: "",
                                label: "Choose category",
                            },
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
                                value: "insurance",
                                label: "Insurance",
                            },
                        ]}
                        required
                    />

                    <FormInput
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />

                </div>
            </FormSection>

            {/* =====================================================
                COMPLIANCE DATES
            ====================================================== */}
            <FormSection
                title="Compliance Dates"
                description="Important dates for this compliance item."
            >
                <div className="grid gap-6 md:grid-cols-3">

                    <FormInput
                        type="date"
                        label="Issue Date"
                        name="issue_date"
                        value={formData.issue_date}
                        onChange={handleChange}
                    />

                    <FormInput
                        type="date"
                        label="Expiry Date"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                    />

                    <FormInput
                        type="number"
                        label="Renewal Period (Days)"
                        name="renewal_period"
                        value={formData.renewal_period}
                        onChange={handleChange}
                        min="0"
                    />

                </div>
            </FormSection>

            {/* =====================================================
                RESPONSIBILITY
            ====================================================== */}
            <FormSection
                title="Responsibility"
                description="Assign people responsible for managing and reviewing this compliance item."
            >
                <div className="grid gap-6 md:grid-cols-2">

                    <FormInput
                        label="Responsible Person"
                        name="responsible_person"
                        value={formData.responsible_person}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Reviewer"
                        name="reviewer"
                        value={formData.reviewer}
                        onChange={handleChange}
                    />

                </div>
            </FormSection>

            {/* =====================================================
                STATUS & PRIORITY
            ====================================================== */}
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
                                value: "draft",
                                label: "Draft",
                            },
                            {
                                value: "active",
                                label: "Active",
                            },
                            {
                                value: "pending",
                                label: "Pending",
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

            {/* =====================================================
                REMINDER SETTINGS
            ====================================================== */}
            <FormSection
                title="Reminder Settings"
                description="Configure how and when renewal reminders should be sent."
            >
                <div className="space-y-6">

                    <FormInput
                        type="number"
                        label="Reminder Before Expiry (Days)"
                        name="reminder_days"
                        value={formData.reminder_days}
                        onChange={handleChange}
                        min="0"
                    />

                    <div className="grid gap-4 md:grid-cols-2">

                        {/* Email Reminder */}
                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                            <input
                                type="checkbox"
                                name="email_reminder"
                                checked={formData.email_reminder}
                                onChange={handleChange}
                                className="h-4 w-4 rounded"
                            />

                            <div>
                                <p className="font-medium text-gray-900">
                                    Email Reminders
                                </p>

                                <p className="text-sm text-gray-500">
                                    Send renewal reminders through email.
                                </p>
                            </div>
                        </label>

                        {/* WhatsApp Reminder */}
                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                            <input
                                type="checkbox"
                                name="whatsapp_reminder"
                                checked={formData.whatsapp_reminder}
                                onChange={handleChange}
                                className="h-4 w-4 rounded"
                            />

                            <div>
                                <p className="font-medium text-gray-900">
                                    WhatsApp Reminders
                                </p>

                                <p className="text-sm text-gray-500">
                                    Send renewal reminders through WhatsApp.
                                </p>
                            </div>
                        </label>

                    </div>
                </div>
            </FormSection>

            {/* =====================================================
                DESCRIPTION & NOTES
            ====================================================== */}
            <FormSection
                title="Additional Information"
                description="Add any useful description or internal notes."
            >
                <div className="space-y-6">

                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe this compliance requirement..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="notes"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Notes
                        </label>

                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Add internal notes..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                </div>
            </FormSection>

            {/* =====================================================
                FORM ACTIONS
            ====================================================== */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">

                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {mode === "edit"
                        ? "Update Compliance"
                        : "Save Compliance"}
                </button>

            </div>
        </form>
    );
}

export default ComplianceForm;

