import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, ArrowLeft, Check, AlertCircle, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await api.delete(`/products/${id}`);
        toast.success("Product deleted successfully");
        navigate('/products');
      } catch (error) {
        console.error("Delete failed", error);
        toast.error("Failed to delete product");
      }
    }
  };

  if (loading) return <div className="text-center py-32 text-gray-500">Loading details...</div>;
  if (!product) return <div className="text-center py-32 text-red-500">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-32">
      <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="bg-gray-100 h-[400px] md:h-auto overflow-hidden relative group">
            <img 
              src={product.imageUrl || "https://via.placeholder.com/600"} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Info Section */}
          <div className="p-10 flex flex-col justify-center">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-3">
              {product.category?.name || "Premium Product"}
            </span>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.stock > 0 ? (
                <span className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                  <Check className="w-4 h-4 mr-1" /> In Stock ({product.stock})
                </span>
              ) : (
                <span className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
                  <AlertCircle className="w-4 h-4 mr-1" /> Out of Stock
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              
              {/* BUTTON ADD TO CART */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`Added ${product.name} to cart`);
                }}
                disabled={product.stock === 0}
                className="w-full md:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              {/* ADMIN CONTROL BUTTONS (Visible only to Admin) */}
              {user?.role === 'ADMIN' && (
                <>
                  <button
                      onClick={() => navigate(`/admin/product/edit/${id}`)}
                      className="w-full md:w-auto bg-blue-50 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-100 transition-all border border-blue-100"
                  >
                    <Edit className="w-5 h-5" />
                    Edit Product
                  </button>

                  <button
                      onClick={handleDelete}
                      className="w-full md:w-auto bg-red-50 text-red-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-red-100 transition-all border border-red-100"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Product
                  </button>
                </>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}