import api
 from "../../../services/api";


const settingsService ={
    async getCompany(){
        const response = await api.get(
            "/accounts/companies/me/"
        );
        return response.data;
    },
    async updateCompany(data) {
        const response =await api.patch(
            "/accounts/companies/me/",
            data
        );
        return response.data;
    },

    getNotificationPreferences: async () => {

        return api.get(
            "/accounts/notification-preferences/"
        );

    },

    updateNotificationPreferences: async (data) => {

        return api.patch(
            "/accounts/notification-preferences/",
            data
        );

    },

};

export default settingsService;

