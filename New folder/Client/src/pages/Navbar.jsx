import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Layers,
  LayoutGrid,
  UserPlus,
  LogIn,
  Menu,
  X,
  LogOut
} from "lucide-react";

// Define the navigation items
const navItems = [
  { to: "/", label: "Products", icon: Home },
  { to: "/categories", label: "Categories", icon: Layers },
  { to: "/subcategories", label: "Sub-Categories", icon: LayoutGrid },
  { to: "/create", label: "Add Product", icon: PlusCircle },
  { to: "/enquiry", label: "Enquiry", icon: LogIn },
  { to: "/contact", label: "Contact", icon: UserPlus },
];

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Logout function clears localStorage and redirects to login page
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");  // Redirecting to login page after logout
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md text-gray-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r z-50 transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-64'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Site Name */}
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <h2 className="text-xs uppercase font-semibold text-gray-500 mb-4 tracking-wider">
              Main Menu
            </h2>
            <ul className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={()=> (handleLogout(), navigate(0))}
                  className="flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>

          {/* User Profile/Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <UserPlus size={16} />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
