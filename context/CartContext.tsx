'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export interface CartItem {
  _id: string;
  name: string;
  price: string; // e.g., "29.99"
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    () => {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === item._id);
      if (existing) {
        toast.info('Increased quantity in cart');
        return prev.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        toast.success('Added to cart');
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (_id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== _id)
    );
    toast.warn('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      'useCart must be used within a CartProvider'
    );
  return context;
};
