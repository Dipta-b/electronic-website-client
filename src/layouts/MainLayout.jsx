import { Outlet } from "react-router";
import AppNavbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <div className=" bg-gray-500 dark:bg-gray-800"><AppNavbar></AppNavbar></div>
            <Outlet></Outlet>
            <div className="mt-8">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;
