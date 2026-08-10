import { useEffect, useState } from "react";

import FormSection from "./forms/FormSection";
import FormInput from "./forms/FormInput";
import FormSelect from "./forms/FormSelect";

import api from "../../../services/api";


function ComplianceForm({
    mode = "create",
    initialData = {},
    onSubmit,
}) {

    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [loadingOptions, setLoadingOptions] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        company: initialData.company || "",

        department: initialData.department || "",

        name: initialData.name || "",

        category: initialData.category || "license",

        issue_date: initialData.issue_date || "",

        expiry_date: initialData.expiry_date || "",

        responsible_person:
            initialData.responsible_person || "",

        status:
            initialData.status || "draft",

        priority:
            initialData.priority || "medium",

        document: null,

    });

    const [existingDocument, setExistingDocument] = useState(null);

    useEffect(() => {
        if (!initialData) {
            return;
        }

        setForm({
            company: initialData.company || "",
            department: initialData.department || "",
            name: initialData.name || "",
            category: initialData.category || "license",
            issue_date: initialData.issue_date || "",
            expiry_date: initialData.expiry_date || "",
            responsible_person: initialData.responsible_person || "",
            status: initialData.status || "draft",
            priority: initialData.priority || "medium",
            document: null,
        });

        setExistingDocument(
            initialData.document || null
        );
    }, [initialData]);


    useEffect(() => {

        loadOptions();

    }, []);


    const loadOptions = async () => {

        try {

            setLoadingOptions(true);

            const [
                companyResponse,
                departmentResponse,
            ] = await Promise.all([

                api.get("/accounts/companies/"),

                api.get("/accounts/departments/"),

            ]);

            setCompanies(
                companyResponse.data.results ||
                companyResponse.data
            );

            setDepartments(
                departmentResponse.data.results ||
                departmentResponse.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load companies and departments."
            );

        } finally {

            setLoadingOptions(false);

        }

    };


    const handleChange = (event) => {

        const {
            name,
            value,
            files,
        } = event.target;


        if (name === "document") {

            setForm(previous => ({

                ...previous,

                document: files?.[0] || null,

            }));

            return;
        }


        setForm(previous => ({

            ...previous,

            [name]: value,

        }));


        if (name === "company") {

            setForm(previous => ({

                ...previous,

                company: value,

                department: "",

            }));

        }

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        if (
            form.issue_date &&
            form.expiry_date &&
            form.expiry_date < form.issue_date
        ) {

            setError(
                "Expiry date cannot be before the issue date."
            );

            return;

        }


        try {

            setSubmitting(true);


            const formData = new FormData();

            formData.append(
                "company",
                form.company
            );

            formData.append(
                "department",
                form.department
            );

            formData.append(
                "name",
                form.name
            );

            formData.append(
                "category",
                form.category
            );

            formData.append(
                "issue_date",
                form.issue_date
            );

            formData.append(
                "expiry_date",
                form.expiry_date
            );

            formData.append(
                "responsible_person",
                form.responsible_person
            );

            formData.append(
                "status",
                form.status
            );

            formData.append(
                "priority",
                form.priority
            );


            if (form.document instanceof File) {
                formData.append(
                    "document",
                    form.document
                );
            }


            await onSubmit(formData);

    } catch (error) {
        console.error("COMPLIANCE SUBMIT ERROR:", error);
        console.error("STATUS:", error?.response?.status);
        console.error("RESPONSE DATA:", error?.response?.data);

        const backendError = error?.response?.data;

        if (backendError) {
            setError(
                typeof backendError === "string"
                    ? backendError
                    : Object.entries(backendError)
                        .map(([field, messages]) => {
                            const text = Array.isArray(messages)
                                ? messages.join(" ")
                                : String(messages);

                            return `${field}: ${text}`;
                        })
                        .join(" ")
            );
        } else {
            setError(
                "Unable to save the compliance item."
            );
        }
    } finally {
        setSubmitting(false);
    }


    };


    const categoryOptions = [

        {
            value: "license",
            label: "License",
        },

        {
            value: "permit",
            label: "Permit",
        },

        {
            value: "insurance",
            label: "Insurance",
        },

        {
            value: "certificate",
            label: "Certificate",
        },

        {
            value: "contract",
            label: "Contract",
        },

    ];


    const priorityOptions = [

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

    ];


    const createStatusOptions = [

        {
            value: "draft",
            label: "Draft",
        },

    ];


    const editStatusOptions = [

        {
            value: "draft",
            label: "Draft",
        },

        {
            value: "under_review",
            label: "Under Review",
        },

        {
            value: "rejected",
            label: "Rejected",
        },

        {
            value: "approved",
            label: "Approved",
        },

        {
            value: "active",
            label: "Active",
        },

        {
            value: "expiring",
            label: "Expiring",
        },

        {
            value: "renewal_in_progress",
            label: "Renewal In Progress",
        },

        {
            value: "expired",
            label: "Expired",
        },

        {
            value: "archived",
            label: "Archived",
        },

    ];


    const statusOptions =
        mode === "create"
            ? createStatusOptions
            : editStatusOptions;


    const filteredDepartments =
        departments.filter(
            department =>
                !form.company ||
                department.company === form.company
        );


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
                        description="
                            Basic information about this compliance item.
                        "
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormInput
                                label="Compliance Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Business License"
                                required
                            />


                            <FormSelect
                                label="Category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                options={categoryOptions}
                                required
                            />

                        </div>

                    </FormSection>


                    {/* Ownership */}

                    <FormSection
                        title="Ownership"
                        description="
                            Select the company, department and person
                            responsible for this compliance item.
                        "
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormSelect
                                label="Company"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                options={companies.map(company => ({

                                    value: company.id,

                                    label: company.name,

                                }))}
                                required
                                disabled={loadingOptions}
                            />


                            <FormSelect
                                label="Department"
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                options={filteredDepartments.map(
                                    department => ({

                                        value: department.id,

                                        label: department.name,

                                    })
                                )}
                                required
                                disabled={
                                    loadingOptions ||
                                    !form.company
                                }
                            />


                            <FormInput
                                label="Responsible Person"
                                name="responsible_person"
                                value={form.responsible_person}
                                onChange={handleChange}
                                placeholder="Responsible person"
                                required
                            />

                        </div>

                    </FormSection>


                    {/* Dates */}

                    <FormSection
                        title="Compliance Dates"
                        description="
                            Define when the compliance item was issued
                            and when it expires.
                        "
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormInput
                                type="date"
                                label="Issue Date"
                                name="issue_date"
                                value={form.issue_date}
                                onChange={handleChange}
                                required
                            />


                            <FormInput
                                type="date"
                                label="Expiry Date"
                                name="expiry_date"
                                value={form.expiry_date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </FormSection>


                    {/* Status */}

                    <FormSection
                        title="Status & Priority"
                        description="
                            Define the lifecycle state and importance
                            of this compliance item.
                        "
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormSelect
                                label="Status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                options={statusOptions}
                                required
                                disabled={
                                    mode === "create"
                                }
                            />


                            <FormSelect
                                label="Priority"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                options={priorityOptions}
                                required
                            />

                        </div>

                    </FormSection>


                    {/* Document */}

                    <FormSection
                        title="Supporting Document"
                        description="
                            Upload the license, permit, certificate,
                            insurance document or other supporting file.
                        "
                    >

                        {existingDocument && (
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700">
                                    Current document
                                </p>

                                <a
                                    href={existingDocument}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        mt-2
                                        inline-block
                                        text-sm
                                        font-medium
                                        text-blue-600
                                        hover:underline
                                    "
                                >
                                    View current document
                                </a>
                            </div>
                        )}

                        <FormInput
                            label={
                                mode === "edit"
                                    ? "Replace document"
                                    : "Compliance Document"
                            }
                            name="document"
                            type="file"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />


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