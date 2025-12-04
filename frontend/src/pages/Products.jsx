import { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast'; 

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Is the backend running?");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
      addToCart(product);
      toast.success(`Added ${product.name} to cart!`);
  };

  if (loading) return <div className="text-center mt-32 text-xl font-bold text-gray-500">Loading amazing gadgets...</div>;
  if (error) return <div className="text-center mt-32 text-red-500 text-xl">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 bg-gray-50 min-h-screen">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Latest Arrivals</h1>
            <p className="text-gray-500 mt-1">Explore our premium collection</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
            </div>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-gray-600">
                <Filter className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col">
            
            {/* Image Area */}
            <div className="h-64 bg-gray-100 relative overflow-hidden p-6 flex items-center justify-center">
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&q=80"} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{product.category?.name || 'GADGET'}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-2xl font-black text-slate-900">${product.price}</span>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="bg-slate-900 hover:bg-blue-600 text-white p-3 rounded-2xl transition-colors shadow-lg hover:shadow-blue-200 active:scale-95 transform"
                  title="Add to Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}