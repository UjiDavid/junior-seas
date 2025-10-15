import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CartItem, useCart } from "../context/CartContext";

interface Props {
  item: CartItem;
}

const CartProductCard = ({ item }: Props) => {
  const { addToCart, removeFromCart } = useCart();

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      // Rebuild the item with quantity - 1 and re-add (simulate reduce logic)
      removeFromCart(item._id);
      addToCart({ ...item, quantity: item.quantity - 1 });
    } else {
      removeFromCart(item._id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h2 className="font-medium text-[var(--color-navyBlue)]">
            {item.name}
          </h2>
          <p className="text-sm text-gray-600">
            ₦{parseFloat(item.price).toLocaleString()} × {item.quantity}
          </p>
          <div className="flex items-center mt-2 gap-2">
            <button
              onClick={decreaseQuantity}
              className="p-1 border rounded hover:bg-gray-100"
            >
              <FiMinus size={14} />
            </button>
            <span className="min-w-[24px] text-center">{item.quantity}</span>
            <button
              onClick={() => addToCart(item)}
              className="p-1 border rounded hover:bg-gray-100"
            >
              <FiPlus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-[var(--color-navyBlue)]">
          ₦{(parseFloat(item.price) * item.quantity).toLocaleString()}
        </span>
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 hover:text-red-700"
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;