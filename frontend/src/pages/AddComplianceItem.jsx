import { useNavigate } from "react-router-dom";

import complianceService from "../features/compliance/services/complianceService";
import ComplianceForm from "../features/compliance/components/ComplianceForm";
function AddComplianceItem() {

    const navigate = useNavigate();

    const handleCreate = async (data) => {

        try {

            await complianceService.createItem(data);

            alert("Compliance item created successfully.");

            navigate("/compliance");

        } catch (error) {

            console.error(
                "Failed to create compliance item:",
                error
            );

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