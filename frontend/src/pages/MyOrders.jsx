import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Package, Calendar, ShoppingBag, Truck, XCircle, CheckCircle, Clock } from 'lucide-react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return { 
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: <Clock className="w-4 h-4 mr-1" />
        };
      case 'SHIPPED':
        return { 
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: <Truck className="w-4 h-4 mr-1" />
        };
      case 'DELIVERED':
        return { 
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle className="w-4 h-4 mr-1" />
        };
      case 'CANCELLED':
        return { 
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: <XCircle className="w-4 h-4 mr-1" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: <Package className="w-4 h-4 mr-1" />
        };
    }
  };

  if (loading) return <div className="text-center pt-40 text-gray-500">Loading your history...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pt-32 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-blue-100 p-3 rounded-full shadow-sm">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Order History</h1>
          <p className="text-gray-500 text-sm mt-1">Track your past purchases</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
          <p className="text-gray-500 mt-2">Looks like you haven't bought anything.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);

            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                
                {/* Header */}
                <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-10">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Order ID</span>
                      <p className="font-mono font-bold text-gray-900">#{order.id}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" /> DatePlaced
                      </span>
                      <p className="font-medium text-gray-900">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center shadow-sm ${statusStyle.color}`}>
                      {statusStyle.icon}
                      {order.status || 'PENDING'}
                    </span>
                    <span className="text-2xl font-black text-gray-900">${order.totalAmount}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-8">
                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                          <img 
                            src={item.imageUrl || "https://via.placeholder.com/100"} 
                            alt={item.productName} 
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{item.productName}</h4>
                          <p className="text-sm text-gray-500 mt-1 font-medium">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}