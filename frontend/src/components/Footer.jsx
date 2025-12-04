import { Package, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-2xl">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
              TechShop
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premium destination for the latest tech gadgets. 
              We bring the future to your doorstep, completely digital, completely seamless.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-blue-500 transition-colors">Products</Link></li>
              <li><Link to="/cart" className="hover:text-blue-500 transition-colors">My Cart</Link></li>
              <li><Link to="/login" className="hover:text-blue-500 transition-colors">Login / Register</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>support@techshop.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Global & Online Only</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive deals and drops.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                Go
              </button>
            </div>
            {/* Socials */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TechShop. All rights reserved. 100% Online Experience.
        </div>
      </div>
    </footer>
  );
}