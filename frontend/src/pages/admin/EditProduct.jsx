import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Save, ArrowLeft, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); 
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryName: ''
  });

  // load Product and Categories (Simultaneously)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // use Promise.all to fetch both at the same time
        const [productRes, categoryRes] = await Promise.all([
            api.get(`/products/${id}`),
            api.get('/categories')
        ]);

        const p = productRes.data;
        setCategories(categoryRes.data); // store categories

        setFormData({
            name: p.name,
            description: p.description,
            price: p.price,
            stock: p.stock,
            imageUrl: p.imageUrl,
            categoryName: p.category?.name || ''
        });
      } catch (error) {
        toast.error("Failed to load data");
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  // submit changes (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, formData);
      toast.success("Product updated successfully!");
      navigate(`/product/${id}`); // go back
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  if (loading) return <div className="text-center pt-40"><Loader className="animate-spin h-8 w-8 mx-auto text-blue-600"/></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pt-32">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-6">
        <ArrowLeft className="w-4 h-4" /> Cancel & Go Back
      </button>

      <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Edit Product <span className="text-gray-400 text-lg">#{id}</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
            <input 
              type="text" required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea 
              rows="4" required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input 
                type="number" step="0.01" required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {/* Stock */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock</label>
              <input 
                type="number" required
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* CATEGORY DROPDOWN*/}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <div className="relative">
                <select 
                    required
                    value={formData.categoryName}
                    onChange={(e) => setFormData({...formData, categoryName: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white cursor-pointer"
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {/* -> */}
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
            <input 
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
          >
            <Save className="w-5 h-5" /> Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}