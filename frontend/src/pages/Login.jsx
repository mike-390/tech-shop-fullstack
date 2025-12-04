import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // function that reads the hidden data inside the Token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  try {
    const response = await api.post('/auth/authenticate', { email, password });
    
    // DEBUGGING 
    console.log('Response from backend:', response.data);
    
    const token = response.data.access_token;
    
    // check
    console.log('Token type:', typeof token);
    console.log('Token value:', token);
    
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token received');
    }
    
    // decode the token
    const decoded = parseJwt(token);
    console.log("User Data from Token:", decoded);

    // find the role
    const userRole = decoded?.role || decoded?.roles || decoded?.authorities?.[0]?.authority || 'USER';
    
    console.log('👤 User Role:', userRole);

    // perform login, storing the role as well
    login(token, userRole);
    
    // see what was stored
    console.log('Stored token:', localStorage.getItem('token'));
    console.log('Stored role:', localStorage.getItem('role'));
    
    toast.success('Welcome back!');
    navigate('/');
    
  } catch (err) {
    console.error('Login error:', err);
    toast.error('Invalid email or password!');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="email" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}