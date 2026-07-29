import api from "./api";

const notificationService = {

    getAll(params = {}) {
        return api.get("/notifications/", {
            params,
        });
    },

    getUnreadCount() {
        return api.get(
            "/notifications/unread-count/"
        );
    },

    getStats() {
        return api.get(
            "/notifications/stats/"
        );
    },

    markRead(id) {
        return api.patch(
            `/notifications/${id}/read/`
        );
    },

    markAllRead() {
        return api.patch(
            "/notifications/read-all/"
        );
    },

    delete(id) {
        return api.delete(
            `/notifications/${id}/`
        );
    },

    deleteRead() {
        return api.delete(
            "/notifications/read/"
        );
    }

};

export default notificationService;