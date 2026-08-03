import api from "../../../services/api";

const notificationService = {

    async getNotifications() {
        const response = await api.get("/notifications/");
        return response.data;
    },

    async getUnreadCount() {
        const response = await api.get("/notifications/unread-count/");
        return response.data;
    },

    async markAsRead(id) {
        const response = await api.patch(
            `/notifications/${id}/read/`
        );

        return response.data;
    },

    async markAllAsRead() {
        const response = await api.patch(
            "/notifications/read-all/"
        );

        return response.data;
    },

    async deleteNotification(id) {
            return api.delete(`/notifications/${id}/`);
        },

};

export default notificationService;