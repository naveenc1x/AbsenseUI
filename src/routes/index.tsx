import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./protectedRoutes";
import Logout from "../page/auth/logout";
import Login from "../page/auth/login";
import Dashboard from "../page/dashboard";
import AdminDashboard from "../page/AdminDashboard";


const Routes = () => {
    const { token } = useAuth();

    // Define public routes accessible to all users
    // const routesForPublic = [
    //     {
    //         path: "/service",
    //         element: <div>Service Page</div>,
    //     },
    //     {
    //         path: "/about-us",
    //         element: <div>About Us</div>,
    //     },
    // ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                // {
                //     path: "",
                //     element: <div>User Home Page</div>,
                // },
                {
                    path: "/admin-dashboard",
                    element: <AdminDashboard />,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "/logout",
                    element: <Logout />,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        // {
        //     path: "/",
        //     element: <div>Home Page</div>,
        // },
        {
            path: "/login",
            element: <Login />,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        // ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);


    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;