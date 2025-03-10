import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
// import { Package } from "lucide-react";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-white pt-20 px-4">Loading...</div>;
  }

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
            Order Management
          </h1>
          <p className="text-center text-[#0f2810] text-sm">
            Manage and track all orders
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg border border-[#9ca]/20"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#9ca]/10">
              <thead className="bg-[#0f2810]/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#0f2810] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#9ca]/10">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0f2810]">
                      {order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0f2810]">
                      {order.user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#0f2810]">
                      {order.products.map((p) => (
                        <div key={p.product._id}>
                          {p.product.brand} {p.product.model}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0f2810]">
                      ${order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          order.status === "arrived"
                            ? "bg-green-100 text-green-800"
                            : order.status === "dispatching"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className="rounded-md border border-[#9ca]/20 text-[#0f2810] text-sm"
                      >
                        <option value="wrapping">Wrapping</option>
                        <option value="dispatching">Dispatching</option>
                        <option value="arrived">Arrived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
