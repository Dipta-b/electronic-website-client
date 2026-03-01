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




        ],
},
{
    path:'/dashboard/user',
    element:<PrivateRoutes allowedRoles={["user"]}>
        <UserDashboard></UserDashboard>
    </PrivateRoutes>
},
{
    path:'/dashboard/admin',
    element:<PrivateRoutes allowedRoles={["admin"]}>
        <AdminDashboard></AdminDashboard>
    </PrivateRoutes>
},
{
    path:'/dashboard/superadmin',
    element:<PrivateRoutes allowedRoles={["superadmin"]}>
        <SuperAdminDashboard></SuperAdminDashboard>
    </PrivateRoutes>
},
// {
//     path:'dashboard/admin/pending-users',
//     element:<PendingUsers></PendingUsers>
// }
]);

export default router;