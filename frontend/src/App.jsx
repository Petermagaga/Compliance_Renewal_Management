import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routing/AppRoutes";
import { NotificationProvider } from "./features/notifications/context/NotificationContext";
import {ComplianceFilterProvider} from "./features/compliance/components/ComplianceFilters";

function App() {

    return (

        <NotificationProvider>
            <ComplianceFilterProvider>

            <BrowserRouter>

                <AppRoutes />

            </BrowserRouter>
            </ComplianceFilterProvider>

        </NotificationProvider>

    );

}

export default App;