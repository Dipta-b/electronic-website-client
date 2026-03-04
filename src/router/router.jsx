import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../slots/Login";
import Register from "../slots/Register";
import PrivateRoutes from "./PrivateRoutes";
import UserDashboard from "../pages/dashboard/UserDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import PendingUsers from "../slots/PendingUsers";
import CartPage from "../pages/CartPage";
import ProductDetailsPage from "../pages/ProductsDetailsPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/cart",
                element: <PrivateRoutes>
                    <CartPage></CartPage>
                </PrivateRoutes>
            },
            {
                path: "/product-details/:id",
                element: <ProductDetailsPage></ProductDetailsPage>
            },




        ],
    },
    {
        path: '/dashboard/user',
        element: <PrivateRoutes allowedRoles={["user"]}>
            <UserDashboard></UserDashboard>
        </PrivateRoutes>
    },
    {
        path: '/dashboard/admin',
        element: <PrivateRoutes allowedRoles={["admin"]}>
            <AdminDashboard></AdminDashboard>
        </PrivateRoutes>
    },
    {
        path: '/dashboard/superadmin',
        element: <PrivateRoutes allowedRoles={["superadmin"]}>
            <SuperAdminDashboard></SuperAdminDashboard>
        </PrivateRoutes>
    },
    // {
    //     path:'dashboard/admin/pending-users',
    //     element:<PendingUsers></PendingUsers>
    // }
]);

export default router;