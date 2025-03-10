import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import { motion } from "framer-motion";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-[#0f2810] font-playfair text-xl">Processing...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 font-playfair text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden border border-[#9ca]/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-[#0f2810] w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-playfair text-center text-[#0f2810] font-light mb-2">
            Purchase Successful!
          </h1>

          <p className="text-[#0f2810]/70 text-center mb-6">
            Thank you for your order. {"We're"} processing it now.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6 border border-[#9ca]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#0f2810]/70">Order number</span>
              <span className="text-sm font-playfair text-[#0f2810]">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#0f2810]/70">
                Estimated delivery
              </span>
              <span className="text-sm font-playfair text-[#0f2810]">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="w-full bg-[#0f2810] text-white font-medium py-2.5 px-4
              rounded-md transition duration-200 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </div>

            <Link
              to="/"
              className="w-full bg-white border border-[#9ca]/20 text-[#0f2810] font-medium py-2.5 px-4 
                rounded-md transition duration-200 flex items-center justify-center
                hover:bg-[#0f2810] hover:text-white focus:outline-none focus:ring-2 
                focus:ring-[#9ca] focus:ring-offset-2"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;
