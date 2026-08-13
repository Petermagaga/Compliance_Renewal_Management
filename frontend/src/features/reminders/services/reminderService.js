import api from "../../../services/api";

const reminderService = {

    async getReminders() {

        const response = await api.get(
            "/reminders/"
        );

        return response.data;
    },

};

export default reminderService;