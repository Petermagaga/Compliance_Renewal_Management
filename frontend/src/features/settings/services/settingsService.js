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
};

export default settingsService;

