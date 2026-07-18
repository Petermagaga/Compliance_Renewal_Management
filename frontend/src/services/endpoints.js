const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/token/",          // ✅ corrected
    REFRESH: "/api/token/refresh/", // ✅ corrected
    REGISTER: "/auth/register/",
    CURRENT_USER: "/auth/me/",
  },

  DASHBOARD: "/api/analytics/dashboard/",   // ✅ add /api prefix
  COMPLIANCE: "/api/compliance/items/",     // ✅ add /api prefix
  DEPARTMENTS: "/api/departments/",         // ✅ add /api prefix
};

export default ENDPOINTS;
