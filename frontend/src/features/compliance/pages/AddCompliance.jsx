import { useNavigate } from "react-router-dom";

import complianceService from "../services/complianceService";
import ComplianceForm from "../components/ComplianceForm";

function AddCompliance() {

    const navigate = useNavigate();

    const handleCreate = async (data) => {

        await complianceService.createItem(data);

        navigate("/compliance");

    };

    return (

        <ComplianceForm

            mode="create"

            onSubmit={handleCreate}

        />

    );

}

export default AddCompliance;