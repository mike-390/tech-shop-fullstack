import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { LayoutDashboard, TrendingUp, Package, User, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/admin/all');
      setOrders(response.data);
    } catch (error) {
      console.error("Admin fetch error:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // this function changes the status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order #${orderId} marked as ${newStatus}`);
      fetchOrders(); // reload the list to see the updated statu
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="text-center pt-40">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600" /> Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">Manage customer orders</p>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Order Header & Actions */}
            <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center border-b border-gray-200 gap-4">
              <div className="flex items-center gap-6">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">#{order.id}</span>
                <span className="text-gray-500 text-sm flex items-center gap-1"><User className="w-4 h-4"/> Customer</span>
              </div>
              
              {/* 👇 DROPDOWN STATUS */}
              <div className="flex items-center gap-4">
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`text-sm font-bold border-none rounded-lg py-1 px-3 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 ${
                    order.status === 'COMPLETED' || order.status === 'SHIPPED' ? 'bg-green-100 text-green-700' : 
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
                <span className="font-bold text-gray-900 text-lg ml-4">${order.totalAmount}</span>
              </div>
            </div>

            {/* Items */}
            <div className="p-6 space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center gap-3">
                     <span className="font-medium text-gray-700">{item.productName}</span>
                     <span className="text-gray-400">x {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-gray-900">${item.price}</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}