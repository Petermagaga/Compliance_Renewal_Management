const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/token/",          // ✅ corrected
    REFRESH: "/api/token/refresh/", // ✅ corrected
    REGISTER: "/auth/register/",
    CURRENT_USER: "/api/auth/me/",
  },

  DASHBOARD: "/api/analytics/dashboard/",   
  COMPLIANCE: "/api/compliance/items/",     
  DEPARTMENTS: "/api/departments/",         
};

export default ENDPOINTS;
