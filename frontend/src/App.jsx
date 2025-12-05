import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import About from './pages/About';
import AddProduct from './pages/admin/AddProduct';
import ProductDetails from './pages/ProductDetails';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/admin/AdminOrders';
import EditProduct from './pages/admin/EditProduct';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col"> 
      <Navbar />
      
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex-grow"> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Customer Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} /> 

          {/* Admin Routes */}
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/product/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>

      <Footer /> 
    </div>
  );
}

export default App;