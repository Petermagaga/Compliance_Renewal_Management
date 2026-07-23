import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routing/AppRoutes";
import { NotificationProvider } from "./features/notifications/context/NotificationContext";

function App() {

    return (

        <NotificationProvider>

            <BrowserRouter>

                <AppRoutes />

            </BrowserRouter>

        </NotificationProvider>

    );

}

export default App;