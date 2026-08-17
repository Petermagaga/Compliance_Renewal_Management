const ENDPOINTS = {
  AUTH: {
    LOGIN: "/token/",          // ✅ corrected
    REFRESH: "/token/refresh/", 
    REGISTER: "/auth/register/",
    CURRENT_USER: "auth/me/",
  },

  DASHBOARD: "/api/analytics/dashboard/",   
  COMPLIANCE: "/api/compliance/items/",     
  DEPARTMENTS: "/api/departments/",         
};

export default ENDPOINTS;
