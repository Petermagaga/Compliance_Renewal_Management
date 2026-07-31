import {
    useDashboard as useDashboardContext,
} from "../context/DashboardContext";

export function useDashboard() {
    return useDashboardContext();
}

export default useDashboard;