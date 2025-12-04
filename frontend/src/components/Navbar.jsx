import { ShoppingCart, LogIn, LogOut, Package, PlusSquare } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
    // get the isAdmin value from the Context
    const { isAuthenticated, logout, isAdmin } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gray-900 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <Package className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">TechShop</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 bg-gray-100/50 px-6 py-2 rounded-full border border-gray-200/50">
                        <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                        <Link to="/products" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Products</Link>
                        <Link to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Our Story</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        
                        {/* --- THE ADMIN BUTTON --- */}
                        {isAdmin && (
                            <Link 
                                to="/admin/add-product" 
                                className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-700 hover:text-blue-600"
                                title="Add Product"
                            >
                                <PlusSquare className="h-5 w-5" />
                            </Link>
                        )}
                        {/* --------------------------- */}

                        <Link to="/cart" className="relative p-3 hover:bg-gray-100 rounded-full transition-colors group">
                            <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                            {cartItems.length > 0 && (
                                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <div className="w-px h-6 bg-gray-300"></div>

                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                <LogIn className="h-4 w-4" /> Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}