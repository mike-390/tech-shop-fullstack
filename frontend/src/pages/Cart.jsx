import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login'); // if not authenticated, redirect to Login
      return;
    }

    setLoading(true);
    try {
      // prepare the data as the Backend expects (OrderRequest -> OrderItemRequest)
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      // Send the POST request
      await api.post('/orders', orderData);
      
       // clear the cart and show success
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-32 pb-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            {/* Image */}
            <img src={item.imageUrl || "https://via.placeholder.com/100"} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
            
            {/* Info */}
            <div className="ml-6 flex-1">
              <h3 className="font-bold text-gray-900">{item.name}</h3>
              <p className="text-gray-500 text-sm">${item.price} x {item.quantity}</p>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-6">
              <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500 text-lg">Total Amount</span>
          <span className="text-3xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Processing...' : (
            <>Checkout <ArrowRight className="h-5 w-5" /></>
          )}
        </button>
      </div>
    </div>
  );
}