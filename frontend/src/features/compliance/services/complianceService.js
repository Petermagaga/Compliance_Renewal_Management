import api from "../../../services/api";

const getAuditTrail = (id) =>
    api.get(`/compliance/items/${id}/audit/`);

const getReminderHistory = (id) =>
    api.get(`/compliance/items/${id}/reminders/`);



const complianceService = {

    getItems(page=1) {
        return api.get(`/compliance/items/?page=${page}`);
    },

    getItem(id) {
        return api.get(`/compliance/items/${id}/`);
    },

    createItem(data) {
        return api.post("/compliance/items/", data);
    },

    updateItem(id, data) {
        return api.put(`/compliance/items/${id}/`, data);
    },

    patchItem(id, data) {
        return api.patch(`/compliance/items/${id}/`, data);
    },

    deleteItem(id) {
        return api.delete(`/compliance/items/${id}/`);
    },
    getAuditTrail(id) {
        return api.get(`/compliance/items/${id}/audit/`);
    }


};

export default {

    getItems,

    getItem,

    createItem,

    updateItem,

    deleteItem,

    getAuditTrail,

    getReminderHistory,
    complianceService

};



