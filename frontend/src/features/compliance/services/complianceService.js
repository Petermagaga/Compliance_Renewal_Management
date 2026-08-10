import api from "../../../services/api";

const complianceService = {

    getItems(page = 1) {
        return api.get(`/compliance/items/?page=${page}`);
    },

    getItem(id) {
        return api.get(`/compliance/items/${id}/`);
    },

    createItem(data) {
        return api.post(
            "/compliance/items/",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

    updateItem(id, data) {
        return api.put(
            `/compliance/items/${id}/`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

    patchItem(id, data) {
        return api.patch(
            `/compliance/items/${id}/`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

    deleteItem(id) {
        return api.delete(`/compliance/items/${id}/`);
    },

    getAuditTrail(id) {
        return api.get(`/compliance/items/${id}/audit/`);
    },

    getReminderHistory(id) {
        return api.get(`/compliance/items/${id}/reminders/`);
    },

};

export default complianceService;