const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/token/",          // ✅ correc
    REFRESH: "/api/token/refresh/", 
    REGISTER: "/auth/register/",
    CURRENT_USER: "/auth/me/",
  },

  DASHBOARD: "/api/analytics/dashboard/",   
  COMPLIANCE: "/api/compliance/items/",     
  DEPARTMENTS: "/api/departments/",         
};

export default ENDPOINTS;
