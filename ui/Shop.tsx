'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../ui/components/ProductCard';

const ShopPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [category, setCategory] = useState('');
  const [ram, setRam] = useState('');
  const [rom, setRom] = useState('');
  const [priceRange, setPriceRange] = useState<
    [number, number]
  >([0, 1000000]);
  const [sortSelection, setSortSelection] = useState(
    'created_at_desc'
  ); // UI string

  // map UI selection to API params:
  const { sortBy, sortOrder } = useMemo(() => {
    if (sortSelection === 'price_asc')
      return { sortBy: 'price', sortOrder: 'asc' as const };
    if (sortSelection === 'price_desc')
      return {
        sortBy: 'price',
        sortOrder: 'desc' as const,
      };
    // created_at_descent = newest first
    return {
      sortBy: 'created_at',
      sortOrder: 'desc' as const,
    };
  }, [sortSelection]);

  // reset page when filters/sort change
  useEffect(
    () => setPage(1),
    [category, ram, rom, priceRange, sortSelection]
  );

  const params = useMemo(
    () => ({
      page,
      limit,
      category: category || undefined,
      ram: ram || undefined,
      rom: rom || undefined,
      price_min: priceRange[0],
      price_max: priceRange[1],
      sortBy,
      sortOrder,
    }),
    [
      page,
      limit,
      category,
      ram,
      rom,
      priceRange,
      sortBy,
      sortOrder,
    ]
  );

  const { data, isLoading, isError, error, refetch } =
    useProducts(params);
  // data shape from your backend: { products: [...], total, page, limit, totalPages }
  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">
            Filters
          </h2>
          <div className="mb-4">
            <label className="block font-medium">
              Category
            </label>
            <select
              className="w-full mt-1 border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Phones">Phones</option>
              <option value="Chargers">Chargers</option>
              <option value="Accessories">
                Accessories
              </option>
              <option value="Speakers">Speakers</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium">RAM</label>
            <select
              className="w-full mt-1 border rounded p-2"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            >
              <option value="">Any</option>
              <option value="4GB">4GB</option>
              <option value="6GB">6GB</option>
              <option value="8GB">8GB</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium">ROM</label>
            <select
              className="w-full mt-1 border rounded p-2"
              value={rom}
              onChange={(e) => setRom(e.target.value)}
            >
              <option value="">Any</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">
              Max Price
            </label>
            <input
              type="range"
              min={0}
              max={1000000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number(e.target.value),
                ])
              }
            />
            <p>
              ₦{priceRange[0].toLocaleString()} - ₦
              {priceRange[1].toLocaleString()}
            </p>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shop</h2>
            <select
              className="border rounded p-2"
              value={sortSelection}
              onChange={(e) =>
                setSortSelection(e.target.value)
              }
            >
              <option value="created_at_desc">
                Newest
              </option>
              <option value="price_asc">
                Price: Low to High
              </option>
              <option value="price_desc">
                Price: High to Low
              </option>
            </select>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(limit)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 h-48 rounded-xl animate-pulse"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500">
              <p>
                Failed to load products:{' '}
                {(error as any)?.message ?? 'Unknown error'}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product: any) => (
                  <ProductCard
                    key={product.id ?? product._id}
                    product={product}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-6">
                <button
                  disabled={page <= 1}
                  onClick={() =>
                    setPage((p) => Math.max(1, p - 1))
                  }
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

// import { useState } from "react";
// import { useProducts } from "../hooks/useProducts";
// import SortDropdown from "../ui/components/SortDropdown";
// import ProductCard from "../ui/components/ProductCard";
// import FilterSidebar from "../ui/components/FilterSidebar";
// import Pagination from "../ui/components/Pagination";

// export default function ShopPage() {
//   const [page, setPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
//   const [priceRange, setPriceRange] = useState<[number, number] | undefined>();
//   const [sort, setSort] = useState<{ sortOrder: string }>({ sortOrder: "" });

//   // ✅ Map sort.sortOrder to actual backend format
//   let sortBy = "created_at"; // default sorting
//   let sortOrder: "asc" | "desc" | undefined = undefined;

//   if (sort.sortOrder === "low-to-high") {
//     sortBy = "price";
//     sortOrder = "asc";
//   } else if (sort.sortOrder === "high-to-low") {
//     sortBy = "price";
//     sortOrder = "desc";
//   } else if (sort.sortOrder === "latest") {
//     sortBy = "created_at";
//     sortOrder = "desc";
//   } else if (sort.sortOrder === "popularity") {
//     sortBy = "views"; // or your popularity metric
//     sortOrder = "desc";
//   }

//   const params = {
//     page,
//     limit: 12,
//     category: selectedCategory,
//     priceRange,
//     sortBy,
//     sortOrder, // ✅ Correct type for backend
//   };

//   const { data, isLoading, isError } = useProducts(params);

//   return (
//     <div className="flex gap-6">
//       {/* Sidebar */}
//       <FilterSidebar
//         onCategoryChange={(cat) => setSelectedCategory(cat)}
//         onPriceChange={(range) => setPriceRange(range)}
//       />

//       <div className="flex-1">
//         {/* Sort Dropdown */}
//         <div className="flex justify-end mb-4">
//           <SortDropdown
//             value={sort.sortOrder}
//             onChange={(value) => setSort({ sortOrder: value })}
//           />
//         </div>

//         {/* Products Grid */}
//         {isLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {[...Array(12)].map((_, i) => (
//               <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-lg" />
//             ))}
//           </div>
//         ) : isError ? (
//           <p className="text-red-500">Failed to load products</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {data?.products?.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="mt-6">
//           <Pagination
//             currentPage={page}
//             totalPages={data?.totalPages || 1}
//             onPageChange={setPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
