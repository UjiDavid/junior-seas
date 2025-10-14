// import { Link } from "react-router-dom";

// interface Props {
//   results: any[];
//   loading: boolean;
//   visible: boolean;
// }

// const SearchSuggestions: React.FC<Props> = ({ results, loading, visible }) => {
//   if (!visible) return null;

//   return (
//     <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 border border-gray-200">
//       {loading ? (
//         <p className="p-3 text-gray-500 text-sm">Searching...</p>
//       ) : results.length > 0 ? (
//         <ul>
//           {results.map((product) => (
//             <li key={product.id}>
//               <Link
//                 to={`/product/${product.slug}`}
//                 className="flex items-center gap-3 p-2 hover:bg-gray-100"
//               >
// <img
//   src={
//     product.image ||
//     product.images?.[0] ||
//     product.variants?.[0]?.image ||
//     "/placeholder.png"
//   }
//   alt={product.name}
//   className="w-10 h-10 rounded-md object-cover"
// />
//                 <div className="flex flex-col">
//                   <span className="text-sm font-medium text-gray-800">
//                     {product.name}
//                   </span>
//                   {product.price && (
//                     <span className="text-xs text-gray-500">
//                       ₦{product.price.toLocaleString()}
//                     </span>
//                   )}
//                 </div>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="p-3 text-gray-500 text-sm">No results found</p>
//       )}
//     </div>
//   );
// };

// export default SearchSuggestions;

// src/ui/SearchSuggestions.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number | string;
  name: string;
  slug?: string;
  image?: string | null;
  images?: string[] | null;
  variants?: any[] | null;
  price?: number | null;
  category?: string | null;
}

interface Props {
  results: Product[];
  loading: boolean;
  visible: boolean;
  searchText?: string;
  onSelect?: () => void | null; // called when a suggestion is clicked  a lght bulb idea just came to my mind now, I CAN MAKE THIS ONSELECT
  // PROPERTY HAVE A FUNCTION THAT RETURNS A COMPONENT,THIS COMPONENT WOULD BE DISPLAY WHAT HAS BEEN SELECTED, THAT IS THE PRODUCT
  // THAT HAS BEEN SELECTED WILL BE DISPLAYED IN A CERTAIN WAY, NO MATTER WHAT PRODUCT THEY JUST GET DISPLAYED LIKE THAT;
  //IS THIS A CONVENTION ? WHAT WOULD BE THE CONVENTIONAL AND IDEAL WAY TO DO WHAT I HAVE JUST THOUGHT ABOUT
}

/** escape regex to avoid breaking user input */
// const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// const highlightMatch = (text = "", query = "") => {
//   if (!query) return text;
//   const q = escapeRegExp(query);
//   const regex = new RegExp(`(${q})`, "gi");
//   return text.replace(regex, "<mark class='bg-yellow-100 font-semibold'>$1</mark>");
// };

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// replace highlightMatch (HTML approach) with a safe renderer that returns React nodes
const renderHighlighted = (text = "", query = ""): React.ReactNode => {
  if (!query) return text;
  const q = escapeRegExp(query);
  const splitRegex = new RegExp(`(${q})`, "gi");
  const exactMatchRegex = new RegExp(`^${q}$`, "i");
  const parts = text.split(splitRegex);
  return parts.map((part, i) =>
    exactMatchRegex.test(part) ? (
      <mark key={i} className="bg-yellow-100 font-semibold">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const SearchSuggestions: React.FC<Props> = ({
  results,
  loading,
  visible,
  searchText = "",
  onSelect,
}) => {
  if (!visible) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 border border-gray-200 max-h-[400px] overflow-y-auto"
      role="listbox"
    >
      {loading ? (
        <p className="p-3 text-gray-500 text-sm">Searching...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map((product) => {
            const src =
              (product.image as string) ||
              (Array.isArray(product.images) && product.images[0]) ||
              (product.variants && product.variants[0]?.image) ||
              "/placeholder.png";

            return (
              <li key={product.id} className="border-b border-b-(--color-skyBlue)  last:border-b-0">
                <Link
                  to={product.slug ? `/product/${product.slug}` : "#"}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100"
                  onClick={() => onSelect?.()}
                >
                  <img
                    src={src}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md "
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/placeholder.png";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm text-gray-800 truncate"
                      >
                      {renderHighlighted(product.name ?? "", searchText)}
                      </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500 truncate">
                        {product.category ?? "Uncategorized"}
                      </span>
                      {product.price != null && (
                        <span className="text-xs text-gray-700 font-medium">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="p-3 text-gray-500 text-sm">No results found</p>
      )}
    </div>
  );
};

export default SearchSuggestions;
// This component displays search suggestions based on user input.
// It highlights matching text and handles loading and empty states.
// It also ensures accessibility with appropriate roles and attributes.
