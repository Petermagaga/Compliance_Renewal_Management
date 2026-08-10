import { useEffect, useState } from "react";

import FormSection from "./forms/FormSection";
import FormInput from "./forms/FormInput";
import FormSelect from "./forms/FormSelect";

import api from "../../../services/api";

function ComplianceForm({
    mode = "create",
    initialData = null,
    companies = [],
    departments = [],
    onSubmit,
}) {
    const [form, setForm] = useState({
        company: "",
        department: "",
        name: "",
        category: "license",
        issue_date: "",
        expiry_date: "",
        responsible_person: "",
        status: "draft",
        priority: "medium",
        document: null,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    /*
    ------------------------------------------------
    LOAD EXISTING ITEM FOR EDIT
    ------------------------------------------------
    */

    useEffect(() => {
        if (!initialData) return;

        setForm({
            company: initialData.company ?? "",
            department: initialData.department ?? "",
            name: initialData.name ?? "",
            category: initialData.category ?? "license",
            issue_date: initialData.issue_date ?? "",
            expiry_date: initialData.expiry_date ?? "",
            responsible_person: initialData.responsible_person ?? "",
            status: initialData.status ?? "draft",
            priority: initialData.priority ?? "medium",

            // IMPORTANT:
            // Never put initialData.document here.
            // Django expects a File object when uploading.
            document: null,
        });
    }, [initialData]);

    /*
    ------------------------------------------------
    HANDLE TEXT / SELECT INPUTS
    ------------------------------------------------
    */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    /*
    ------------------------------------------------
    HANDLE DOCUMENT
    ------------------------------------------------
    */

    const handleDocumentChange = (e) => {
        const file = e.target.files?.[0] || null;

        setForm((previous) => ({
            ...previous,
            document: file,
        }));

        setErrors((previous) => ({
            ...previous,
            document: "",
        }));
    };

    /*
    ------------------------------------------------
    VALIDATION
    ------------------------------------------------
    */

    const validate = () => {
        const newErrors = {};

        if (!form.company) {
            newErrors.company = "Company is required.";
        }

        if (!form.department) {
            newErrors.department = "Department is required.";
        }

        if (!form.name.trim()) {
            newErrors.name = "Compliance name is required.";
        }

        if (!form.issue_date) {
            newErrors.issue_date = "Issue date is required.";
        }

        if (!form.expiry_date) {
            newErrors.expiry_date = "Expiry date is required.";
        }

        if (
            form.issue_date &&
            form.expiry_date &&
            form.expiry_date < form.issue_date
        ) {
            newErrors.expiry_date =
                "Expiry date cannot be before issue date.";
        }

        if (!form.responsible_person.trim()) {
            newErrors.responsible_person =
                "Responsible person is required.";
        }

        /*
        File validation only happens when a NEW file
        has been selected.
        */

        if (form.document) {
            const allowedTypes = [
                "application/pdf",
                "image/jpeg",
                "image/png",
            ];

            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!allowedTypes.includes(form.document.type)) {
                newErrors.document =
                    "Only PDF, JPG and PNG files are allowed.";
            }

            if (form.document.size > maxSize) {
                newErrors.document =
                    "Document must be smaller than 10MB.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /*
    ------------------------------------------------
    BUILD FORMDATA
    ------------------------------------------------
    */

    const buildFormData = () => {
        const formData = new FormData();

        formData.append("company", form.company);
        formData.append("department", form.department);
        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("issue_date", form.issue_date);
        formData.append("expiry_date", form.expiry_date);
        formData.append(
            "responsible_person",
            form.responsible_person
        );
        formData.append("status", form.status);
        formData.append("priority", form.priority);

        /*
        VERY IMPORTANT

        Only append document when it is an actual File.

        During EDIT:
        document === null
        means:
        "keep the existing document"
        */

        if (form.document instanceof File) {
            formData.append("document", form.document);
        }

        return formData;
    };

    /*
    ------------------------------------------------
    SUBMIT
    ------------------------------------------------
    */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);

        try {
            const formData = buildFormData();

            /*
            Debugging helper.
            You can remove this later.
            */

            console.log("Submitting compliance item:");

            for (const [key, value] of formData.entries()) {
                console.log(
                    key,
                    value instanceof File
                        ? value.name
                        : value
                );
            }

            await onSubmit(formData);

        } catch (error) {
            console.error(
                "Compliance form submission failed:",
                error
            );
        } finally {
            setSubmitting(false);
        }
    };

    /*
    ------------------------------------------------
    RENDER
    ------------------------------------------------
    */

    return (
        <div className="mx-auto max-w-5xl p-8">

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-900">
                    {mode === "edit"
                        ? "Edit Compliance Item"
                        : "Add Compliance Item"}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    {mode === "edit"
                        ? "Update the compliance record and optionally replace its document."
                        : "Add a new compliance requirement to the registry."}
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                {/* -------------------------------- */}
                {/* BASIC INFORMATION */}
                {/* -------------------------------- */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-bold">
                        Basic Information
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Company */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Company
                            </label>

                            <select
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            >

                                <option value="">
                                    Select company
                                </option>

                                {companies.map((company) => (
                                    <option
                                        key={company.id}
                                        value={company.id}
                                    >
                                        {company.name}
                                    </option>
                                ))}

                            </select>

                            {errors.company && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.company}
                                </p>
                            )}

                        </div>

                        {/* Department */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Department
                            </label>

                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            >

                                <option value="">
                                    Select department
                                </option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}

                            </select>

                            {errors.department && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.department}
                                </p>
                            )}

                        </div>

                        {/* Name */}

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium">
                                Compliance Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Business License"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}

                        </div>

                        {/* Category */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            >

                                <option value="license">
                                    License
                                </option>

                                <option value="permit">
                                    Permit
                                </option>

                                <option value="insurance">
                                    Insurance
                                </option>

                                <option value="certificate">
                                    Certificate
                                </option>

                                <option value="contract">
                                    Contract
                                </option>

                            </select>

                        </div>

                        {/* Priority */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            >

                                <option value="low">
                                    Low
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="high">
                                    High
                                </option>

                                <option value="critical">
                                    Critical
                                </option>

                            </select>

                        </div>

                    </div>

                </section>


                {/* -------------------------------- */}
                {/* DATES */}
                {/* -------------------------------- */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-bold">
                        Validity Period
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Issue Date
                            </label>

                            <input
                                type="date"
                                name="issue_date"
                                value={form.issue_date}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />

                            {errors.issue_date && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.issue_date}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Expiry Date
                            </label>

                            <input
                                type="date"
                                name="expiry_date"
                                value={form.expiry_date}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />

                            {errors.expiry_date && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.expiry_date}
                                </p>
                            )}

                        </div>

                    </div>

                </section>


                {/* -------------------------------- */}
                {/* RESPONSIBLE PERSON */}
                {/* -------------------------------- */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-bold">
                        Responsibility
                    </h2>

                    <div>

                        <label className="mb-2 block text-sm font-medium">
                            Responsible Person
                        </label>

                        <input
                            type="text"
                            name="responsible_person"
                            value={form.responsible_person}
                            onChange={handleChange}
                            placeholder="Enter responsible person's name"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />

                        {errors.responsible_person && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.responsible_person}
                            </p>
                        )}

                    </div>

                </section>


                {/* -------------------------------- */}
                {/* STATUS */}
                {/* -------------------------------- */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-bold">
                        Lifecycle Status
                    </h2>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 md:w-1/2"
                    >

                        <option value="draft">
                            Draft
                        </option>

                        <option value="under_review">
                            Under Review
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="expiring">
                            Expiring
                        </option>

                        <option value="renewal_in_progress">
                            Renewal In Progress
                        </option>

                        <option value="expired">
                            Expired
                        </option>

                        <option value="archived">
                            Archived
                        </option>

                    </select>

                </section>


                {/* -------------------------------- */}
                {/* DOCUMENT */}
                {/* -------------------------------- */}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-2 text-lg font-bold">
                        Compliance Document
                    </h2>

                    <p className="mb-6 text-sm text-gray-500">
                        Upload the supporting compliance document.
                    </p>

                    {mode === "edit" &&
                        initialData?.document && (
                            <div className="mb-4 rounded-lg bg-gray-50 p-4 text-sm">

                                <p className="font-medium">
                                    Existing document
                                </p>

                                <a
                                    href={initialData.document}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View current document
                                </a>

                            </div>
                        )}

                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleDocumentChange}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                        PDF, JPG or PNG. Maximum size: 10MB.
                    </p>

                    {form.document && (
                        <p className="mt-2 text-sm text-gray-700">
                            Selected:{" "}
                            <strong>
                                {form.document.name}
                            </strong>
                        </p>
                    )}

                    {errors.document && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.document}
                        </p>
                    )}

                </section>


                {/* -------------------------------- */}
                {/* BUTTONS */}
                {/* -------------------------------- */}

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-lg bg-brand-green px-6 py-2.5 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting
                            ? "Saving..."
                            : mode === "edit"
                                ? "Update Compliance"
                                : "Create Compliance"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ComplianceForm;