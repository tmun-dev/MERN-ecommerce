import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { Package } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders/user");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "wrapping": return "text-yellow-600";
      case "dispatching": return "text-blue-600";
      case "arrived": return "text-green-600";
      default: return "text-[#0f2810]";
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-center font-playfair text-[#0f2810] font-light mb-1">
            My Profile
          </h1>
          <p className="text-center text-[#0f2810] text-sm">
            Welcome back, {user.name}
          </p>
        </motion.div>

        <div className="mt-8">
          <h2 className="text-2xl font-playfair text-[#0f2810] mb-4">My Orders</h2>
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white mb-4 rounded-lg border border-[#9ca]/20 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#0f2810] font-playfair">
                  Order #{order._id.slice(-6)}
                </h3>
                <span className={`${getStatusColor(order.status)} capitalize`}>
                  {order.status}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {order.products.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={`data:${item.product.imageType};base64,${item.product.image}`}
                      alt={item.product.brand}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-[#0f2810]">
                        {item.product.brand} {item.product.model}
                      </p>
                      <p className="text-[#0f2810]/60 text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 