import api from "../../../services/api";

const complianceService = {

    getItems() {
        return api.get("/compliance/items/");
    },

    deleteItem(id) {
        return api.delete(`/compliance/items/${id}/`);
    },

};

export default complianceService;