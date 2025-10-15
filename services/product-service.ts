import axiosInstance from "../lib/axios";

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  price_min?: number;
  price_max?: number;
  ram?: string;
  rom?: string;
  color?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc" | undefined;
}

export const fetchProducts = async (params: ProductQueryParams = {}) => {
  const { data } = await axiosInstance.get("/products", { params });
  return data; // { products, total, page, limit, totalPages }
};

// export const getProducts = async (categoryId: string) => {
//   console.log("Fetching products for category:", categoryId); // ADD THIS
//   const response = await axiosInstance.get(`/products?category=${categoryId}`);
//   console.log("Product Data:", response.data); // ADD THIS
//   return response.data.products || [];
// };

// export const getProducts = async (filters: {
//   category?: string;
//   priceRange?: [number, number];
//   ram?: string;
//   rom?: string;
//   sort?: string;
// }) => {
//   const params = new URLSearchParams();

//   if (filters.category) params.append("category", filters.category);
//   if (filters.priceRange) {
//     params.append("minPrice", filters.priceRange[0].toString());
//     params.append("maxPrice", filters.priceRange[1].toString());
//   }
//   if (filters.ram) params.append("ram", filters.ram);
//   if (filters.rom) params.append("rom", filters.rom);
//   if (filters.sort) params.append("sort", filters.sort);

//   const response = await axiosInstance.get(`/products?${params.toString()}`);
//   return response.data.products || [];
// };






// services/productService.ts (or wherever getProducts is)

//LAST EDIT
// ✅ Update getProducts in frontend
// export const getProducts = async (filters: {
//   category?: string;
//   priceRange?: [number, number];
//   ram?: string;
//   rom?: string;
//   sort?: string; // e.g. "latest" | "price_low" | "price_high"
//   page?: number;
//   limit?: number;
// }) => {
//   const params = new URLSearchParams();

//   if (filters.category) params.append("category", filters.category);
//   if (filters.priceRange) {
//     params.append("price_min", filters.priceRange[0].toString());
//     params.append("price_max", filters.priceRange[1].toString());
//   }
//   if (filters.ram) params.append("ram", filters.ram);
//   if (filters.rom) params.append("rom", filters.rom);

//   // ✅ Map sort values to backend keys
//   if (filters.sort) {
//     if (filters.sort === "latest") {
//       params.append("sortBy", "created_at");
//       params.append("sortOrder", "desc");
//     } else if (filters.sort === "price_low") {
//       params.append("sortBy", "price");
//       params.append("sortOrder", "asc");
//     } else if (filters.sort === "price_high") {
//       params.append("sortBy", "price");
//       params.append("sortOrder", "desc");
//     }
//   }

//   if (filters.page) params.append("page", filters.page.toString());
//   if (filters.limit) params.append("limit", filters.limit.toString());

//   const response = await axiosInstance.get(`/products?${params.toString()}`);
//   return response.data; // products, totalPages, etc.
// };
