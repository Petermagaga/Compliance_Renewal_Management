import api from "./api";


const accountsService = {

    getCompanies() {
        return api.get("/accounts/companies/");
    },

    getDepartments() {
        return api.get("/accounts/departments/");
    },

};


export default accountsService;