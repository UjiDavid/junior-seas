// // src/components/FilterSidebar.tsx
// import React from "react";

// interface Props {
//   filters: any;
//   setFilters: (filters: any) => void;
// }

// const categories = ["Phones", "Smart Watches", "TV & Audio"];
// const ramOptions = ["2GB", "4GB", "6GB", "8GB"];
// const romOptions = ["32GB", "64GB", "128GB"];

// export default function FilterSidebar({ filters, setFilters }: Props) {
//   const handleChange = (field: string, value: string | [number, number]) => {
//     setFilters((prev: any) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <aside className="space-y-4">
//       <div>
//         <h3 className="font-semibold mb-2">Category</h3>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.category}
//           onChange={(e) => handleChange("category", e.target.value)}
//         >
//           <option value="">All</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <h3 className="font-semibold mb-2">Price</h3>
//         <input
//           type="range"
//           min={0}
//           max={1000}
//           step={50}
//           value={filters.priceRange[1]}
//           onChange={(e) =>
//             handleChange("priceRange", [0, parseInt(e.target.value)])
//           }
//         />
//         <p className="text-sm">Up to ${filters.priceRange[1]}</p>
//       </div>

//       <div>
//         <h3 className="font-semibold mb-2">RAM</h3>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.ram || ""}
//           onChange={(e) => handleChange("ram", e.target.value)}
//         >
//           <option value="">All</option>
//           {ramOptions.map((ram) => (
//             <option key={ram} value={ram}>
//               {ram}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <h3 className="font-semibold mb-2">ROM</h3>
//         <select
//           className="w-full border rounded p-2"
//           value={filters.rom || ""}
//           onChange={(e) => handleChange("rom", e.target.value)}
//         >
//           <option value="">All</option>
//           {romOptions.map((rom) => (
//             <option key={rom} value={rom}>
//               {rom}
//             </option>
//           ))}
//         </select>
//       </div>
//     </aside>
//   );
// }




// // FilterSidebar.tsx
// import { FC } from "react";

// interface FilterSidebarProps {
//   filters: {
//     category: string;
//     priceRange: [number, number];
//     ram: string;
//     rom: string;
//     sort: string;
//   };
//   onFilterChange: (filters: Partial<FilterSidebarProps["filters"]>) => void;
// }

// const FilterSidebar: FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
//   const handleChange = (
//     key: keyof FilterSidebarProps["filters"],
//     value: string | [number, number]
//   ) => {
//     onFilterChange({ [key]: value });
//   };

//   return (
//     <div className="w-64 border-r pr-4">
//       <h3 className="text-lg font-semibold mb-4">Filters</h3>

//       <div className="mb-4">
//         <label className="block font-medium">Category</label>
//         <select
//           className="w-full border p-2"
//           value={filters.category}
//           onChange={(e) => handleChange("category", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Smart Watches">Smart Watches</option>
//           <option value="TV & Audio">TV & Audio</option>
//           <option value="Phones">Phones</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block font-medium">RAM</label>
//         <select
//           className="w-full border p-2"
//           value={filters.ram}
//           onChange={(e) => handleChange("ram", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="2GB">2GB</option>
//           <option value="4GB">4GB</option>
//           <option value="6GB">6GB</option>
//           <option value="8GB">8GB</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block font-medium">ROM</label>
//         <select
//           className="w-full border p-2"
//           value={filters.rom}
//           onChange={(e) => handleChange("rom", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="32GB">32GB</option>
//           <option value="64GB">64GB</option>
//           <option value="128GB">128GB</option>
//           <option value="256GB">256GB</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;









// import { FC } from "react";

// interface FilterSidebarProps {
//   filters: {
//     category: string;
//     priceRange: [number, number]; // required tuple
//     ram: string;
//     rom: string;
//     sort: string;
//   };
//   onFilterChange: (filters: Partial<FilterSidebarProps["filters"]>) => void;
// }

// const FilterSidebar: FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
//   const handleChange = (
//     key: keyof FilterSidebarProps["filters"],
//     value: string | [number, number]
//   ) => {
//     onFilterChange({ [key]: value });
//   };

//   const handlePriceChange = (index: 0 | 1, value: number) => {
//     const newRange: [number, number] = [...filters.priceRange] as [number, number];
//     newRange[index] = value;
//     handleChange("priceRange", newRange);
//   };

//   return (
//     <div className="w-64 border-r pr-4">
//       <h3 className="text-lg font-semibold mb-4">Filters</h3>

//       {/* Category */}
//       <div className="mb-4">
//         <label className="block font-medium">Category</label>
//         <select
//           className="w-full border p-2"
//           value={filters.category}
//           onChange={(e) => handleChange("category", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Smart Watches">Smart Watches</option>
//           <option value="TV & Audio">TV & Audio</option>
//           <option value="Phones">Phones</option>
//         </select>
//       </div>

//       {/* Price Range */}
//       <div className="mb-4">
//         <label className="block font-medium">Price Range</label>
//         <div className="flex gap-2 mt-1">
//           <input
//             type="number"
//             className="w-full border p-2"
//             placeholder="Min"
//             value={filters.priceRange[0]}
//             onChange={(e) => handlePriceChange(0, Number(e.target.value))}
//           />
//           <input
//             type="number"
//             className="w-full border p-2"
//             placeholder="Max"
//             value={filters.priceRange[1]}
//             onChange={(e) => handlePriceChange(1, Number(e.target.value))}
//           />
//         </div>
//       </div>

//       {/* RAM */}
//       <div className="mb-4">
//         <label className="block font-medium">RAM</label>
//         <select
//           className="w-full border p-2"
//           value={filters.ram}
//           onChange={(e) => handleChange("ram", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="2GB">2GB</option>
//           <option value="4GB">4GB</option>
//           <option value="6GB">6GB</option>
//           <option value="8GB">8GB</option>
//         </select>
//       </div>

//       {/* ROM */}
//       <div className="mb-4">
//         <label className="block font-medium">ROM</label>
//         <select
//           className="w-full border p-2"
//           value={filters.rom}
//           onChange={(e) => handleChange("rom", e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="32GB">32GB</option>
//           <option value="64GB">64GB</option>
//           <option value="128GB">128GB</option>
//           <option value="256GB">256GB</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;





import { FC } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FilterSidebarProps {
  filters: {
    category: string;
    priceRange: [number, number];
    ram: string;
    rom: string;
    sort: string;
  };
  onFilterChange: (filters: Partial<FilterSidebarProps["filters"]>) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const handleChange = (
    key: keyof FilterSidebarProps["filters"],
    value: string | [number, number]
  ) => {
    onFilterChange({ [key]: value });
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      handleChange("priceRange", [value[0], value[1]]);
    }
  };

  return (
    <div className="w-64 border-r pr-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block font-medium">Category</label>
        <select
          className="w-full border p-2"
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All</option>
          <option value="Smart Watches">Smart Watches</option>
          <option value="TV & Audio">TV & Audio</option>
          <option value="Phones">Phones</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">RAM</label>
        <select
          className="w-full border p-2"
          value={filters.ram}
          onChange={(e) => handleChange("ram", e.target.value)}
        >
          <option value="">All</option>
          <option value="2GB">2GB</option>
          <option value="4GB">4GB</option>
          <option value="6GB">6GB</option>
          <option value="8GB">8GB</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">ROM</label>
        <select
          className="w-full border p-2"
          value={filters.rom}
          onChange={(e) => handleChange("rom", e.target.value)}
        >
          <option value="">All</option>
          <option value="32GB">32GB</option>
          <option value="64GB">64GB</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Price Range</label>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
        <div className="text-sm mt-1">
          ₦{filters.priceRange[0]} - ₦{filters.priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
