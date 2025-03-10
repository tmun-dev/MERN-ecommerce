import { Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCartStore();
  return (
    <div className="rounded-lg border border-[#9ca]/20 bg-white p-4 shadow-lg hover:shadow-xl transition-all duration-300 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <div className="overflow-hidden rounded-lg border border-[#9ca]/10">
            <img
              className="h-20 md:h-32 w-full object-cover hover:scale-105 transition-transform duration-300"
              src={`data:${item.imageType};base64,${item.image}`}
              alt={item.imageType}
            />
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
          <p className="text-lg font-playfair text-[#0f2810] hover:text-[#1a3a1a] transition-colors duration-200">
            {item.brand}
          </p>
          <p className="text-md text-[#0f2810]/80">{item.model}</p>
          <p className="text-sm text-[#0f2810]/60">{item.description}</p>
        </div>

        <div className="flex items-center justify-between md:order-3">
          <div className="text-end">
            <p className="text-xl font-light font-playfair text-[#0f2810]">
              ${item.price}
            </p>
          </div>
        </div>

        <div className="md:order-4">
          <button
            className="group rounded-full p-2 hover:bg-red-50 transition-colors duration-200"
            onClick={() => removeFromCart(item._id)}
            aria-label="Remove item"
          >
            <Trash className="h-5 w-5 text-[#0f2810]/70 group-hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
