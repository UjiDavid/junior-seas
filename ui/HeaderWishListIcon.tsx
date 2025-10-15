import { RiHeartFill } from 'react-icons/ri';
import { useWishlist } from '../context/WishListContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderWishlistIcon = () => {
  const { wishlistItems } = useWishlist();
  const url = usePathname();
  const totalWishlist = wishlistItems.length;

  return (
    <Link
      href="/wishlist"
      className={
        url === '/wishlist'
          ? 'active-link'
          : 'text-[var(--color-navyBlue)]'
      }
    >
      <div className="relative group">
        <RiHeartFill className="hover:text-[var(--color-skyBlue)] duration-200 cursor-pointer" />
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] rounded-full w-3.5 flex items-center justify-center">
          {totalWishlist}
        </span>
        <div
          className="absolute top-7 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center 
          px-1 py-1 bg-[var(--color-navyBlue)] text-white text-[10px] rounded-sm border border-[var(--color-skyBlue)]"
        >
          Wishlist
        </div>
      </div>
    </Link>
  );
};

export default HeaderWishlistIcon;
