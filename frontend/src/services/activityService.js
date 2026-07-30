import api from "./api";

const activityService = {
    getRecent() {
        return api.get("/audit/activities/");
    },
};

export default activityService;