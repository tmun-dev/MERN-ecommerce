import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
// import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
  const { cart } = useCartStore();
  // console.log(cart);
  return (
    <div className="min-h-screen bg-white pt-20 px-4">
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-center font-playfair text-[#0f2810] font-light mb-1">
            Shopping Cart
          </h1>
          <p className="text-center text-[#0f2810] text-sm">
            Review your selected timepieces
          </p>
        </motion.div>

        <div className="mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OrderSummary />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-[#0f2810]/30" />
    <h3 className="text-2xl font-playfair text-[#0f2810]">Your cart is empty</h3>
    <p className="text-[#0f2810]/60">
      Looks like you haven't added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-[#0f2810] px-6 py-2 text-white transition-colors hover:bg-[#1a3a1a]
        focus:outline-none focus:ring-2 focus:ring-[#9ca] focus:ring-offset-2"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);

export default CartPage;
