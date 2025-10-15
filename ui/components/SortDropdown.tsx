// // src/components/SortDropdown.tsx
// import React from "react";

// interface Props {
//   sortBy: string;
//   setSortBy: (value: string) => void;
// }

// const sortOptions = [
//   { label: "Latest", value: "latest" },
//   { label: "Popularity", value: "popularity" },
//   { label: "Price: Low to High", value: "lowToHigh" },
//   { label: "Price: High to Low", value: "highToLow" },
// ];

// export default function SortDropdown({ sortBy, setSortBy }: Props) {
//   return (
//     <select
//       className="border rounded p-2"
//       value={sortBy}
//       onChange={(e) => setSortBy(e.target.value)}
//     >
//       {sortOptions.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   );
// }




// // SortDropdown.tsx
// import { FC } from "react";

// interface SortDropdownProps {
//   sortBy: string;
//   onSortChange: (value: string) => void;
// }

// const SortDropdown: FC<SortDropdownProps> = ({ sortBy, onSortChange }) => {
//   return (
//     <div>
//       <label className="mr-2 font-medium">Sort by:</label>
//       <select
//         value={sortBy}
//         onChange={(e) => onSortChange(e.target.value)}
//         className="border p-2"
//       >
//         <option value="latest">Latest</option>
//         <option value="popular">Popularity</option>
//         <option value="priceLowToHigh">Price: Low to High</option>
//         <option value="priceHighToLow">Price: High to Low</option>
//       </select>
//     </div>
//   );
// };

// export default SortDropdown;



// // SortDropdown.tsx
// import { FC } from "react";

// interface SortDropdownProps {
//   sortBy: string;
//   onSortChange: (value: string) => void;
// }

// const SortDropdown: FC<SortDropdownProps> = ({ sortBy, onSortChange }) => {
//   return (
//     <div>
//       <label className="mr-2 font-medium">Sort by:</label>
//       <select
//         value={sortBy}
//         onChange={(e) => onSortChange(e.target.value)}
//         className="border p-2"
//       >
//         <option value="latest">Latest</option>
//         <option value="popular">Popularity</option>
//         <option value="priceLowToHigh">Price: Low to High</option>
//         <option value="priceHighToLow">Price: High to Low</option>
//       </select>
//     </div>
//   );
// };

// export default SortDropdown;



// frontend/ui/components/SortDropdown.tsx
import { FC } from "react";

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortDropdown: FC<SortDropdownProps> = ({ sortBy, onSortChange }) => {
  return (
    <div>
      <label className="mr-2 font-medium">Sort by:</label>
      <select
        className="border p-2"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortDropdown;
