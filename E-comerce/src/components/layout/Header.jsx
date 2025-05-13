import React from "react";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FaDownload, FaGift, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { categories } from "./categories";
import { motion, AnimatePresence } from "framer-motion";
import CategoryMenu from "./CategoryMenu ";
import { useLocation } from 'react-router-dom';
import logo from "../../assets/icons/logo.png";
import {
    FiHome,
    FiShoppingBag,
    FiBookOpen,
    FiInfo,
    FiMail
} from "react-icons/fi";

const Header = () => {
    const [openCategory, setOpenCategory] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const megaMenuRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setOpenCategory(null);
                setHoveredCategory(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (mobileMenuOpen) {
            setMobileSubmenu(null);
        }
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const handleMobileSubmenu = (index) => {
        setMobileSubmenu(mobileSubmenu === index ? null : index);
    };

    const handleCategoryHover = (index) => {
        setHoveredCategory(index);
        if (index !== null) {
            setOpenCategory("categories");
        }
    };

    return (
        <>


            {/* Main Header */}
            <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
                <div className="container mx-auto px-4">
                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center justify-between py-2">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 transition-transform hover:scale-110"
                            aria-label="Toggle menu"
                        >
                            <FiMenu size={24} />
                        </button>

                        <Link to="/" className="text-xl  font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            <img className="w-32" src={logo} alt="" />
                        </Link>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleSearch}
                                className="p-2 transition-transform hover:scale-110"
                                aria-label="Search"
                            >
                                <FiSearch size={20} />
                            </button>
                            {/* <Link
                to="/cart"
                className="p-2 relative transition-transform hover:scale-110"
                aria-label="Shopping cart"
              >
                <FiShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link> */}
                        </div>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden md:flex items-center justify-between">
                        {/* Logo with hover effect */}
                        <Link
                            to="/"
                            className="text-2xl font-bold text-blue-600 mr-8 hover:text-blue-700 transition-colors"
                        >
                            <img className="w-48" src={logo} alt="" />
                        </Link>

                        {/* Categories Dropdown */}
                        <div className="relative flex-1 max-w-xl" ref={megaMenuRef}>
                            <div className="flex">
                                <button id="primary"
                                    className="flex items-center gap-2  text-white px-4 py-3 rounded-l-md hover:bg-blue-700 transition-all duration-300"
                                    onMouseEnter={() => setOpenCategory("categories")}
                                    onClick={() => setOpenCategory(openCategory === "categories" ? null : "categories")}
                                    aria-expanded={openCategory === "categories"}
                                    aria-label="Shop categories"
                                >
                                    <FiMenu size={18} />
                                    <span className="font-medium">Categories</span>
                                </button>

                                {/* Search Bar with animation */}
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search for products..."
                                        className="w-full h-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                                        aria-label="Search"
                                    >
                                        <FiSearch size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Mega Menu with animations */}
                            <AnimatePresence>
                                {openCategory === "categories" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 top-full   pt-4  z-50 "
                                        onMouseLeave={() => {
                                            setOpenCategory(null);
                                            setHoveredCategory(null);
                                        }}
                                    >

                                        <CategoryMenu categories={categories} />

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Links with hover effects */}
                        <nav className="hidden lg:flex items-center space-x-6 mx-6">
                            {[
                                { name: "Home", path: "/", icon: <FiHome size={16} className="mr-1.5" /> },
                                { name: "Products", path: "/shop", icon: <FiShoppingBag size={16} className="mr-1.5" /> },
                                { name: "Gallery", path: "/blog", icon: <FiBookOpen size={16} className="mr-1.5" /> },
                                { name: "About", path: "/about", icon: <FiInfo size={16} className="mr-1.5" /> },
                                { name: "Contact", path: "/contact", icon: <FiMail size={16} className="mr-1.5" /> },
                                { name: "Enquiry", path: "/enquiry", icon: <FiMail size={16} className="mr-1.5" /> }

                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group flex items-center ${location.pathname === item.path ? 'text-blue-600' : ''
                                        }`}
                                >
                                    <span className="flex items-center">
                                        {item.icon}
                                        {item.name}
                                    </span>
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}></span>
                                </Link>
                            ))}
                        </nav>

                        {/* User Zone with animations */}
                        <div className="flex items-center space-x-4">
                            {/* <Link
                to="/account"
                className="p-2 text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                aria-label="Account"
              >
                <FiUser size={20} />
              </Link> */}
                            {/* <Link
                to="/cart"
                className="p-2 text-gray-700 hover:text-blue-600 relative transition-all duration-200 hover:scale-110"
                aria-label="Shopping cart"
              >
                <FiShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link> */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden xl:flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-orange-600 transition-colors"
                            >
                                <FaDownload size={16} />
                                <span className="font-medium">Brochure</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Mobile Search with animation */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden bg-white overflow-hidden"
                        >
                            <div className="py-3 px-4 shadow-inner">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search for products..."
                                        className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        onClick={toggleSearch}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <FaTimes size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu with animations */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden fixed inset-0  z-50 pt-16"
                            onClick={toggleMobileMenu}
                        >
                            <motion.div
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: -300 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="bg-white h-full overflow-y-auto max-w-xs w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 border-b">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-lg">Menu</h3>
                                        <button
                                            onClick={toggleMobileMenu}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <FaTimes size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-2">
                                    {[
                                        { name: "Home", path: "/", icon: <FiHome size={18} className="mr-3" /> },
                                        { name: "Shop", path: "/shop", icon: <FiShoppingBag size={18} className="mr-3" /> },
                                        { name: "Blog", path: "/blog", icon: <FiBookOpen size={18} className="mr-3" /> },
                                        { name: "About", path: "/about", icon: <FiInfo size={18} className="mr-3" /> },
                                        { name: "Contact", path: "/contact", icon: <FiMail size={18} className="mr-3" /> }
                                    ].map((item) => {
                                        const isActive = item.path === '/'
                                            ? location.pathname === '/'
                                            : location.pathname.startsWith(item.path);

                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                className={`flex items-center py-3 px-2 font-medium rounded transition-colors ${isActive
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-gray-800 hover:bg-gray-100'
                                                    }`}
                                                onClick={toggleMobileMenu}
                                            >
                                                {React.cloneElement(item.icon, {
                                                    className: `mr-3 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
                                                })}
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="p-4 border-t">
                                    <h3 className="font-bold text-lg mb-2">Categories</h3>
                                    <ul className="space-y-1">
                                        {categories.map((category, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                {typeof category === "string" ? (
                                                    <Link
                                                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {category}
                                                    </Link>
                                                ) : (
                                                    <div>
                                                        <button
                                                            className="w-full flex justify-between items-center py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                            onClick={() => handleMobileSubmenu(index)}
                                                        >
                                                            <span>{category.name}</span>
                                                            {mobileSubmenu === index ? <FiChevronDown /> : <FiChevronRight />}
                                                        </button>

                                                        <AnimatePresence>
                                                            {mobileSubmenu === index && (
                                                                <motion.ul
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: "auto" }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    {category.subcategories.map((sub, subIndex) => (
                                                                        <li key={subIndex}>
                                                                            <Link
                                                                                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                                className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded text-sm transition-colors"
                                                                                onClick={toggleMobileMenu}
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </motion.ul>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                )}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 border-t">
                                    <motion.div
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-md"
                                    >
                                        <FaGift size={16} />
                                        <span className="font-medium">New User Zone</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Header;