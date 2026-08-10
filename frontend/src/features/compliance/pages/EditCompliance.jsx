import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import complianceService from "../services/complianceService";
import ComplianceForm from "../components/ComplianceForm";

function EditCompliance() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadItem = async () => {

            try {

                const response =
                    await complianceService.getItem(id);

                setInitialData(response.data);

            } catch (error) {

                console.error(
                    "Failed to load compliance item:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadItem();

    }, [id]);

    const handleUpdate = async (data) => {

        await complianceService.updateItem(
            id,
            data
        );

        navigate(`/compliance/${id}`);

    };

    if (loading) {

        return (
            <div className="p-8">
                Loading compliance item...
            </div>
        );

    }

    return (
        <ComplianceForm
            mode="edit"
            initialData={initialData}
            onSubmit={handleUpdate}
        />
    );
}

export default EditCompliance;