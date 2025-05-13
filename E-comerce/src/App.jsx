import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRoute';
import Header from './components/layout/header';
import Footer from './components/layout/Footer';
import Home from './pages/home/Home';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BlogPage from './pages/BlogPage';
import ShopPage from './pages/ShopPage';
import ShopCategoryPage from './pages/ShopCategoryPage';
import SubCategoryProductsPage from './pages/SubCategoryProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
// import InquiryFormPage from './pages/InquiryFormPage';
import EnquiryForm from './pages/InquiryFormPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={< ContactUs />} />
              <Route path="/enquiry/:id" element={< EnquiryForm />} />


              <Route path="/blog" element={< BlogPage />} />
              <Route path="/shop" element={< ShopPage />} />
              <Route path="/shop/category" element={<ShopCategoryPage />} />
              <Route path="/subcategory-products" element={<SubCategoryProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />


              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <PrivateRoute adminOnly>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/admin/products" element={
                <PrivateRoute adminOnly>
                  <AdminProducts />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;