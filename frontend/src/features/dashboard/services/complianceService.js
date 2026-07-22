import api from "../../../services/api";

const complianceService = {

    async getItems() {

        const response = await api.get(
            "/compliance/items/"
        );

        return response.data;

    }

};

export default complianceService;