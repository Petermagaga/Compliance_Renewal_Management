import api from "../../../services/api";

const complianceService = {

    getItems(page = 1, 
        search= "",
        status="",
        priority="",
        category=""
    ) {
        return api.get("/compliance/items/", {
            params: {
                page,
                search,
                status,
                priority,
                category
            },
        });
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

    getRenewalHistory(id) {
        return api.get(`/compliance/items/${id}/renewal_history/`);
    },

    getAllRenewals() {
    return api.get("/compliance/items/renewals/");
},

    getAllReminders() {
        return api.get("/compliance/items/reminders/");

    },

    getAllAudit() {
        return api.get("/compliance/items/audit/");
    },




};  

export default complianceService;