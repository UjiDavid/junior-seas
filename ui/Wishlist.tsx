'use client';
import { useWishlist } from '../context/WishListContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        Your Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center py-8">
          Your wishlist is empty.
        </p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h3 className="font-medium">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ₦{item.price}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      addToCart({ ...item, quantity: 1 })
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      removeFromWishlist(item._id)
                    }
                    className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-50 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearWishlist}
            className="mt-6 w-full border border-red-500 text-red-500 py-2 rounded hover:bg-red-50"
          >
            Clear Wishlist
          </button>
        </>
      )}
    </div>
  );
};

export default Wishlist;
