import api from "../../../services/api";

const dashboardService = {

    async getDashboard() {

        const response = await api.get(
            "/analytics/dashboard/"
        );

        return response.data;

    }

};

export default dashboardService;