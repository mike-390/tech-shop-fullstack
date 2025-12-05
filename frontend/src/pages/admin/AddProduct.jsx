import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import { Package, DollarSign, Image as ImageIcon, Tag, Layers, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddProduct() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext); 
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); 

  // if NOT admin, redirect immediately when the page loads
  useEffect(() => {
    if (!isAdmin) {
      toast.error("Unauthorized access! Admins only.");
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Could not load categories", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
    categoryName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded token:', decoded);
    }

    const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
    };

    console.log('📤 Payload:', payload);

    try {
      const response = await api.post('/products', payload);
      console.log('Success:', response.data);
      toast.success('Product added successfully!');
      navigate('/products'); 
    } catch (err) {
      console.error('Full error:', err);
      console.error('Response data:', err.response?.data);
      console.error('Response status:', err.response?.status);
      console.error('Response headers:', err.response?.headers);
    } finally {
      setLoading(false);
    }
  };

  // if not admin, return null to prevent them from seeing anything (until useEffect runs)
  if (!isAdmin) return null;

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-6 w-6 text-slate-600" />
            </button>
            <div>
                <h1 className="text-3xl font-black text-slate-900">Add New Product</h1>
                <p className="text-slate-500">Create a new item for your digital store.</p>
            </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                    <div className="relative">
                        <Package className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input 
                            name="name" 
                            type="text" 
                            required 
                            placeholder="e.g. Ultra Wireless Headphones"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                        name="description" 
                        required 
                        rows="4"
                        placeholder="Describe the features..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                            <input 
                                name="price" 
                                type="number" 
                                step="0.01"
                                required 
                                placeholder="0.00"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Stock Quantity</label>
                        <div className="relative">
                            <Layers className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                            <input 
                                name="stock" 
                                type="number" 
                                required 
                                placeholder="100"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                            <input 
                                name="imageUrl" 
                                type="url" 
                                required 
                                placeholder="https://..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Category (DROPDOWN) */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 z-10" />
                            <select 
                                name="categoryName" 
                                required 
                                value={formData.categoryName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {/* Custom Arrow Icon */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
                >
                    {loading ? 'Saving Product...' : (<><Save className="h-5 w-5" /> Publish Product</>)}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}