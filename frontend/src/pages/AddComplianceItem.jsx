import { useNavigate } from "react-router-dom";
import complianceService from "../features/dashboard/services/complianceService";
import ComplianceForm from "../components/ComplianceForm";

function AddCompliance() {

    const navigate = useNavigate();

    const handleCreate = async (data) => {

        try {

            await complianceService.createItem(data);

            navigate("/compliance");

        } catch (error) {

            console.error("Failed to create compliance item:", error);

        }

    };

    return (

        <ComplianceForm
            mode="create"
            onSubmit={handleCreate}
        />

    );

}

export default AddCompliance;