import { useEffect, useState } from "react";

import {

    useNavigate,

    useParams,

} from "react-router-dom";

import ComplianceForm from "../components/ComplianceForm";

import complianceService from "../services/complianceService";

function EditCompliance() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [item, setItem] = useState(null);

    useEffect(() => {

        complianceService

            .getItem(id)

            .then(res => setItem(res.data));

    }, [id]);

    if (!item) {

        return <p>Loading...</p>;

    }

    const handleUpdate = async (data) => {

        await complianceService.updateItem(

            id,

            data

        );

        navigate(`/compliance/${id}`);

    };

    return (

        <ComplianceForm

            mode="edit"

            initialValues={item}

            onSubmit={handleUpdate}

        />

    );

}

export default EditCompliance;