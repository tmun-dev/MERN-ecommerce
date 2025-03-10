import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="h-screen flex items-start justify-center bg-white px-4 pt-20">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h2 className="text-3xl text-center font-playfair text-[#0f2810] mb-1 font-light">
            Purchase Cancelled
          </h2>
          <p className="text-center text-[#0f2810] text-sm">
            Your order has been cancelled
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 border border-[#9ca]/20"
        >
          <div className="flex justify-center mb-6">
            <XCircle className="text-[#0f2810] w-16 h-16" />
          </div>
          
          <p className="text-[#0f2810]/80 text-center mb-6">
            No charges have been made to your account.
          </p>
          
          <div className="bg-[#0f2810]/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-[#0f2810]/70 text-center">
              If you encountered any issues during the checkout process, please
              don&apos;t hesitate to contact our support team.
            </p>
          </div>

          <Link
            to={"/"}
            className="w-full bg-[#0f2810] hover:bg-[#1a3a1a] text-white font-medium 
              py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Return to Shop
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PurchaseCancelPage;
