import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51QwQebKNfhjM2Pw3EJyTx5BmFeS0SrqlBT1BoQCvQ8yiq57juuhmIN7yZrePL74OBvwlShGz3TzJIPY3c2AN2uWt005xw0vxNv"
);

const OrderSummary = () => {
  const { total, subtotal, cart } = useCartStore();

  // const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  // const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      coupon: null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-[#9ca]/20 bg-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-playfair text-[#0f2810] font-light">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-[#0f2810]/70">
              Original price
            </dt>
            <dd className="text-base font-medium text-[#0f2810]">
              ${formattedSubtotal}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4 border-t border-[#9ca]/20 pt-2">
            <dt className="text-base font-playfair text-[#0f2810]">Total</dt>
            <dd className="text-xl font-light font-playfair text-[#0f2810]">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center rounded-md bg-[#0f2810] px-5 py-2.5 
            text-sm font-medium text-white hover:bg-[#1a3a1a] transition duration-200 
            focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-[#0f2810]/60">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0f2810] 
              hover:text-[#1a3a1a] transition-colors duration-200"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
