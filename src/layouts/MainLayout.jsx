import { Outlet } from "react-router";
import AppNavbar from "../pages/shared/Navbar";

const MainLayout = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <div className=" bg-gray-500 dark:bg-gray-800"><AppNavbar></AppNavbar></div>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;
