import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext);

  // FILTERS STATE 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);
  const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=1000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch Products and Categories simultaneously
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Could not load shop data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // FILTERING LOGIC
  const filteredProducts = products.filter(product => {
    // Search Filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    // Category Filter
    const matchesCategory = selectedCategory === 'All' || product.category?.name === selectedCategory;
    // Price Filter
    const matchesPrice = product.price <= priceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`);
  };

  if (loading) return <div className="text-center pt-40 text-gray-500">Loading shop...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-28 min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className="lg:w-1/4 space-y-6">
          
          {/* Search Box */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" /> Search
            </h3>
            <input 
              type="text" 
              placeholder="Search gadgets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
          

            {/* Price Range Slider */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-blue-600" /> Max Price
                </h3>
                <span className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-lg">${priceRange}</span>
                </div>
                <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>$0</span>
                <span>$5000+</span>
                </div>
            </div>

            {/* Clear Filters Button */}
            {(selectedCategory !== 'All' || searchQuery !== '' || priceRange < 5000) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setPriceRange(5000);
                  }}
                  className="mt-6 w-full py-2 text-red-500 bg-red-50 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                  <X className="w-4 h-4" /> Clear All Filters
                </button>
             )}
          </div>
        </aside>


        {/* RIGHT SIDE: PRODUCTS */}
        <main className="flex-1">
          
          {/* CATEGORY TABS (Pills) */}
          <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                  selectedCategory === 'All' 
                    ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                All Products
              </button>
              
              {/* BUTTONS FOR DATA BASE */}
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                    selectedCategory === cat.name 
                      ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* RESULTS COUNT & EMPTY STATE */}
          <div className="mb-6">
             <p className="text-gray-500 text-sm">
               Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
             </p>
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-[420px]">
                  
                  {/* Image Link */}
                  <Link to={`/product/${product.id}`} className="h-64 bg-gray-100 relative overflow-hidden block">
                    <img 
                      src={product.imageUrl || PLACEHOLDER_IMAGE} 
                      alt={product.name} 
                      onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = PLACEHOLDER_IMAGE; 
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Out of Stock Overlay */}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">Out of Stock</span>
                        </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                          {product.category?.name || 'GADGET'}
                        </div>
                        
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-md font-bold text-gray-900 mb-2 leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-xl font-black text-gray-900">${product.price}</span>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-gray-900 hover:bg-blue-600 text-white p-2.5 rounded-xl transition-colors shadow-lg hover:shadow-blue-200 active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}