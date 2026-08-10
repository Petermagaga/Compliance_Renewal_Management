import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import complianceService from "../services/complianceService";
import ComplianceForm from "../components/ComplianceForm";


function EditCompliance() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadItem = async () => {
            try {
                const response =
                    await complianceService.getItem(id);

                setItem(response.data);
            } catch (error) {
                console.error("Failed to load item:", error);
            } finally {
                setLoading(false);
            }
        };

        loadItem();
    }, [id]);

    const handleUpdate = async (formData) => {
        await complianceService.updateItem(id, formData);

        navigate(`/compliance/${id}`);
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <ComplianceForm
            mode="edit"
            initialData={item}
            onSubmit={handleUpdate}
        />
    );
}

export default EditCompliance;