import { useState } from "react";
import { useNavigate } from "react-router-dom";

import complianceService from "../services/complianceService";
import ComplianceForm from "../components/ComplianceForm";


function AddCompliance() {

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState(null);


    const handleCreate = async (data) => {

        try {

            setSubmitting(true);
            setError(null);

            await complianceService.createItem(data);

            navigate("/compliance");

        } catch (err) {

            console.error(
                "Failed to create compliance item:",
                err
            );

            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Unable to create compliance item. Please check the form and try again.";

            setError(message);

        } finally {

            setSubmitting(false);

        }

    };


    return (

        <div className="space-y-6">

            {/* Page header */}

            <div>

                <h1
                    className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                >
                    Add Compliance Item
                </h1>

                <p
                    className="
                        mt-1
                        text-sm
                        text-slate-500
                    "
                >
                    Register a license, permit, certificate, insurance,
                    or contract and track its renewal.
                </p>

            </div>


            {/* Error */}

            {error && (

                <div
                    className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                    "
                >
                    {error}
                </div>

            )}


            {/* Form */}

            <ComplianceForm

                mode="create"

                onSubmit={handleCreate}

                submitting={submitting}

            />

        </div>

    );

}


export default AddCompliance;