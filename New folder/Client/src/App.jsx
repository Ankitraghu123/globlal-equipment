

// import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom";
// import { Home, QrCode, PlusCircle, ShoppingCart, Layers, LogOut } from "lucide-react";
// import CreateProduct from "./pages/CreateProduct";
// import ProductList from "./pages/ProductList";
// import { CartProvider, useCart } from "./CartContext";
// import CartPage from "./pages/CartPage";
// import CategoryManagement from "./pages/CategoryManagement";
// import SubCategoryManagement from "./pages/SubCategory";
// import Registration from "./pages/Registration";
// // import Login from "./pages/AdminLogin";
// import Sidbar from "./pages/Navbar";
// import EnquiryDisplay from "./pages/enquiryDisplay";
// import ContactDisplay from "./pages/ContactDisplay";
// import AdminLogin from "./pages/AdminLogin";
// import { useState } from "react";
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );

//   const navigate = useNavigate();

//   const handleLogin = () => {
//     localStorage.setItem("isAuthenticated", "true");
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsAuthenticated(false);
//      navigate("/");
//   };

//   return (
//     <CartProvider>
//       <Router>
//         {isAuthenticated ? (
//           <AppContent onLogout={handleLogout} />
//         ) : (
//           <Routes>
//             <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
//           </Routes>
//         )}
//       </Router>
//     </CartProvider>
//   );
// }

// function AppContent({ onLogout }) {
//   const { cart } = useCart();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <Sidbar onLogout={onLogout} />
//       </header>

//       <main className="max-w-7xl me-5 ms-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <Routes>
//             <Route path="/" element={<ProductList />} />
//             <Route path="/create" element={<CreateProduct />} />
//             <Route path="/edit/:id" element={<CreateProduct />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/categories" element={<CategoryManagement />} />
//             <Route path="/subcategories" element={<SubCategoryManagement />} />
//             <Route path="/enquiry" element={<EnquiryDisplay />} />
//             <Route path="/contact" element={<ContactDisplay />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/logout" element={<Logout onLogout={onLogout} />} />
//           </Routes>
//         </div>
//       </main>

//       {/* Bottom Navigation */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
//         <div className="flex justify-around">
//           <BottomNavLink to="/" icon={<Home size={24} />} label="Products" />
//           <BottomNavLink to="/scan" icon={<QrCode size={24} />} label="Scan" />
//           <BottomNavLink to="/create" icon={<PlusCircle size={24} />} label="Add" />
//           <BottomNavLink to="/categories" icon={<Layers size={24} />} label="Categories" />
//           <BottomNavLink
//             to="/cart"
//             icon={
//               <div className="relative">
//                 <ShoppingCart size={24} />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                     {cart.length}
//                   </span>
//                 )}
//               </div>
//             }
//             label="Cart"
//           />
//         </div>
//       </nav>
//     </div>
//   );
// }

// // Bottom Navigation Link Component
// function BottomNavLink({ to, icon, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         isActive
//           ? "text-primary-600 flex flex-col items-center py-2 px-3"
//           : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
//       }
//     >
//       {icon}
//       <span className="text-xs mt-1">{label}</span>
//     </NavLink>
//   );
// }

// // Logout component that triggers logout and redirects
// function Logout({ onLogout }) {
//   onLogout();
//   return <Navigate to="/" replace />;
// }

// export default App;





// App.jsx
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  Home,
  QrCode,
  PlusCircle,
  ShoppingCart,
  Layers,
  LogOut,
} from "lucide-react";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import { CartProvider, useCart } from "./CartContext";
import CartPage from "./pages/CartPage";
import CategoryManagement from "./pages/CategoryManagement";
import SubCategoryManagement from "./pages/SubCategory";
import Registration from "./pages/Registration";
import Sidbar from "./pages/Navbar";
import EnquiryDisplay from "./pages/enquiryDisplay";
import ContactDisplay from "./pages/ContactDisplay";
import AdminLogin from "./pages/AdminLogin";
import { useState, useEffect } from "react";

function App() {
  return (
    <CartProvider>
      <Router>
        <MainApp />
      </Router>
    </CartProvider>
  );
}

// This component is now safely inside <Router>, so useNavigate is valid here
function MainApp() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    navigate("/"); // redirect to product list after login
  
  };
const handleLogout = () => {
  // Clear all relevant data from localStorage
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("cart"); // Clear cart if stored
  localStorage.removeItem("user"); // Clear any user data if stored
  
  navigate(0)
  // Reset state
  setIsAuthenticated(false);

};

  return isAuthenticated ? (
    <AppContent onLogout={handleLogout} />
  ) : (
    <Routes>
      <Route path="*" element={<AdminLogin onLogin={handleLogin} />} />
    </Routes>
  );
}

function AppContent({ onLogout }) {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <Sidbar onLogout={onLogout} />
      </header>

      <main className="max-w-7xl me-5 ms-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/edit/:id" element={<CreateProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/subcategories" element={<SubCategoryManagement />} />
            <Route path="/enquiry" element={<EnquiryDisplay />} />
            <Route path="/contact" element={<ContactDisplay />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/logout" element={<Logout onLogout={onLogout} />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          <BottomNavLink to="/" icon={<Home size={24} />} label="Products" />
          <BottomNavLink
            to="/scan"
            icon={<QrCode size={24} />}
            label="Scan"
          />
          <BottomNavLink
            to="/create"
            icon={<PlusCircle size={24} />}
            label="Add"
          />
          <BottomNavLink
            to="/categories"
            icon={<Layers size={24} />}
            label="Categories"
          />
          <BottomNavLink
            to="/cart"
            icon={
              <div className="relative">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cart.length}
                  </span>
                )}
              </div>
            }
            label="Cart"
          />
        </div>
      </nav>
    </div>
  );
}

// Bottom Navigation Link Component
function BottomNavLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-primary-600 flex flex-col items-center py-2 px-3"
          : "text-gray-500 hover:text-gray-700 flex flex-col items-center py-2 px-3"
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
}

// Logout component that triggers logout and redirects
function Logout({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/" replace />;
}

export default App;
