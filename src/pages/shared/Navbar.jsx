import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { HiSearch, HiShoppingCart } from "react-icons/hi";
import logo from "../../assets/logo.avif";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const placeholders = [
    "Search top electronics...",
    "Find your next laptop...",
    "Discover modern gadgets...",
    "Look up gaming gear...",
    "Explore smart home devices...",
  ];

  // Add scroll listener for sticky nav style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignout = async () => {
    try {
      await fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-6">
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <motion.img 
                whileHover={{ rotate: 5, scale: 1.05 }}
                src={logo} 
                className="h-8 shadow-sm rounded-full" 
                alt="Logo" 
              />
              <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 drop-shadow-sm">
                Woodmarts
              </span>
            </NavLink>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-50 text-cyan-700 dark:bg-slate-800 dark:text-cyan-400"
                          : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER SEARCH (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-lg mx-6">
            <div className="relative group">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]}
                className="w-full bg-[#f8fafc] border border-slate-200/60 focus:bg-white focus:border-[#38bdf8] rounded-full px-6 py-3 pr-14 text-sm transition-all duration-300 premium-inner-shadow focus:ring-[3px] focus:ring-[#38bdf8]/15 dark:bg-slate-800/80 dark:border-slate-700 dark:text-white placeholder:text-slate-400"
              />
              <Link
                to={`/search-result-page?${new URLSearchParams({ query: searchValue || "" }).toString()}`}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-linear-to-r from-[#0ea5e9] to-[#2563eb] text-white rounded-full hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:scale-105 transition-all duration-300"
              >
                <HiSearch className="text-lg" />
              </Link>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative p-2 text-slate-600 hover:text-cyan-600 transition-colors"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <HiShoppingCart className="text-[26px] drop-shadow-sm" />
                <span className="absolute -top-1 -right-1 h-[18px] w-[18px] bg-[#ef4444] rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-[0_2px_5px_rgba(239,68,68,0.4)] border border-white dark:border-slate-900 pointer-events-none">
                  3
                </span>
              </motion.div>
            </NavLink>

            {/* Avatar Dropdown */}
            <div className="pl-2 border-l border-slate-200 dark:border-slate-700">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Avatar
                      alt={user?.name || "Guest"}
                      img={
                        user?.image ||
                        "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      }
                      rounded
                      className="ring-2 ring-transparent hover:ring-cyan-500 transition-all rounded-full p-0.5"
                    />
                  </motion.div>
                }
              >
                <DropdownHeader>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.name || "Guest User"}
                  </span>
                  <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
                    {user?.email || "Welcome to Woodmarts"}
                  </span>
                </DropdownHeader>

                <DropdownDivider />

                {!user && (
                  <>
                    <DropdownItem className="hover:bg-cyan-50 dark:hover:bg-slate-700">
                      <NavLink className="w-full text-left" to="/login">Login Securely</NavLink>
                    </DropdownItem>
                    <DropdownItem className="hover:bg-cyan-50 dark:hover:bg-slate-700">
                      <Link className="w-full text-left" to="/register">Create Account</Link>
                    </DropdownItem>
                  </>
                )}

                {user && (
                  <>
                    <DropdownItem
                      className="hover:bg-cyan-50 dark:hover:bg-slate-700"
                      onClick={() => {
                        if (user.role === "user") navigate("/dashboard/user");
                        if (user.role === "admin") navigate("/dashboard/admin");
                        if (user.role === "superadmin")
                          navigate("/dashboard/superadmin");
                      }}
                    >
                      My Dashboard
                    </DropdownItem>
                    <DropdownItem className="hover:bg-cyan-50 dark:hover:bg-slate-700">
                      <NavLink className="w-full text-left" to="/settings">Account Settings</NavLink>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem className="text-red-600 font-medium hover:bg-red-50 dark:hover:bg-slate-700" onClick={handleSignout}>
                      Sign Out
                    </DropdownItem>
                  </>
                )}
              </Dropdown>
            </div>
            
            {/* Mobile Menu Toggle button */}
            <button 
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Full Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden"
          >
             <div className="p-4 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search electronics..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-12 text-sm"
                  />
                  <Link
                    to={`/search-result-page?query=${searchValue}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-600 text-white rounded-md"
                  >
                    <HiSearch />
                  </Link>
                </div>
                <ul className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-slate-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg font-medium"
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
