import useCartStore from "@/src/store/cartStore";
import { type Product } from "@/src/types";
import { toast } from "sonner";

const AddToCard = ({ product }: { product: Product }) => {
  const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cart,
    pendingCart,
  } = useCartStore();
  const handleAddToCart = (product: Product) => {
    const quantity = pendingCart[product.id] || 1;
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);

    toast.success(`Added ${quantity} of ${product.title} to cart!`);
  };
  return (
    <>
      <div className="flex justify-between gap-2 py-4 flex-wrap">
        {" "}
        <button
          onClick={() => handleAddToCart(product)}
          disabled={cart.some((e) => e.id === product.id)}
          className="w-auto h-10 p-2 bg-blue-400 mt-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-500 transition text-white disabled:bg-gray-400"
        >
          add to card
        </button>
        {cart.some((e) => e.id == product.id) && (
          <button
            onClick={() => removeFromCart(product.id)}
            className="w-auto p-2 h-10 bg-red-500 mt-4 rounded-lg shadow-lg cursor-pointer hover:bg-red-600 transition text-white"
          >
            remove from card
          </button>
        )}
      </div>
      <div className="flex gap-1 justify-between items-center border border-[#757daa] rounded-[6px] p-[4px]">
        <button
          className=" font-bold bg-blue-200 rounded-sm p-2 disabled:bg-gray-400 cursor-pointer"
          onClick={() => decreaseQuantity(product.id)}
          disabled={cart.some((e) => e.id === product.id)}
        >
          -
        </button>
        <button className=" font-bold">
          {cart.some((e) => e.id === product.id)
            ? cart.find((e) => e.id === product.id)?.quantity || 1
            : pendingCart[product.id] || 1}
        </button>
        <button
          className=" font-bold bg-blue-200 rounded-sm p-2 disabled:bg-gray-400 cursor-pointer"
          disabled={cart.some((e) => e.id === product.id)}
          onClick={() => increaseQuantity(product.id)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default AddToCard;
