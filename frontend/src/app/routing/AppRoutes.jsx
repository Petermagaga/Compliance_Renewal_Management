import {

    Routes,

    Route,

} from "react-router-dom";

import {

    routeRegistry,

} from "./routeRegistry";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

    return (

        <Routes>

            {

                routeRegistry.map(route => {

                    const Component = route.element;

                    return (

                        <Route

                            key={route.id}

                            path={route.path}

                            element={

                                route.protected ?

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