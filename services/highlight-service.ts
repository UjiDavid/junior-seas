// import axios from "../lib/axios"; // my axios instance

// export const getHighlights = async () => {
//   const response = await axios.get("/highlights");
//   return response.data;
// };


//LAST WORKING CODE
// import axiosInstance from "../lib/axios";

// export const getHighlights = async (section: string) => {
//   console.log("Fetching section:", section); // ADD THIS RE
//   const response = await axiosInstance.get(`/products?section=${section}`);
//   console.log("Product Data:", response.data); // ADD THIS
//   return response.data.products || [];
// };

//LAST LAST
// import axiosInstance from "../lib/axios";

// export const getAllHighlights = async () => {
//   const response = await axiosInstance.get("/highlights");
//   return response.data.highlights || {};
// };




// services/highlight-service.ts
import axiosInstance from "../lib/axios";

export const getAllHighlights = async () => {
  const response = await axiosInstance.get("/highlights"); // ✅ backend route for all highlights
  return response.data; // should return grouped data { "NEW AT JUNIOR SEAS": [...], "POPULAR AT JUNIOR SEAS": [...] }

};

