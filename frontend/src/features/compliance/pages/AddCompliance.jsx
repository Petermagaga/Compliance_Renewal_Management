import { useNavigate } from "react-router-dom";

import complianceService from "../services/complianceService";
import ComplianceForm from "../components/ComplianceForm";

function AddComplianceItem() {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await complianceService.createItem(formData);

            navigate("/compliance");
        } catch (error) {
            console.error(
                "Failed to create compliance item:",
                error
            );

            throw error;
        }
    };

    return (
        <ComplianceForm
            mode="create"
            onSubmit={handleCreate}
        />
    );
}

export default AddComplianceItem;