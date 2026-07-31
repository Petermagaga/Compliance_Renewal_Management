import {

    Routes,

    Route,

} from "react-router-dom";

import {

    routeRegistry,

} from "./routeRegistry";

import ProtectedRoute from "../../components/ProtectedRoute"
function AppRoutes() {

    return (

        <Routes>

            {

                routeRegistry.map(route => {

                    const Component = route.Component;

                    return (

                        <Route

                            key={route.id}

                            path={route.path}

                            element={

                                route.requiresAuth ?

                                (

                                    <ProtectedRoute>

                                        <Component />

                                    </ProtectedRoute>

                                )

                                :

                                (

                                    <Component />

                                )

                            }

                        />

                    );

                    

                })

            }

        </Routes>

    );

}

export default AppRoutes;