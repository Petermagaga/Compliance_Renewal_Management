import {
    Routes,
    Route,
} from "react-router-dom";

import {
    routeRegistry,
} from "./routeRegistry";

import ProtectedRoute
    from "../../components/ProtectedRoute";

import MainLayout
    from "../../components/layout/MainLayout";


function AppRoutes() {

    return (

        <Routes>

            {routeRegistry.map(route => {

                const Component = route.Component;

                let element = <Component />;


                // ----------------------------------------
                // Dashboard layout
                // ----------------------------------------

                if (route.layout === "dashboard") {

                    element = (
                        <MainLayout>
                            {element}
                        </MainLayout>
                    );

                }


                // ----------------------------------------
                // Authentication
                // ----------------------------------------

                if (route.requiresAuth) {

                    element = (
                        <ProtectedRoute>
                            {element}
                        </ProtectedRoute>
                    );

                }


                return (

                    <Route
                        key={route.id}
                        path={route.path}
                        element={element}
                    />

                );

            })}

        </Routes>

    );

}


export default AppRoutes;