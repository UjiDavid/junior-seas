'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export interface WishlistItem {
  _id: string;
  name: string;
  price: string;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (_id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlistItems, setWishlistItems] = useState<
    WishlistItem[]
  >(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        toast.info('Already in wishlist');
        return prev;
      }
      return [...prev, item];
    });
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (_id: string) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== _id)
    );
    toast.warn('Removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.info('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error(
      'useWishlist must be used within a WishlistProvider'
    );
  return context;
};
