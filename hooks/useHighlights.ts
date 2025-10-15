// hooks/useHighlights.ts
import { useQuery } from "@tanstack/react-query";
import { getAllHighlights } from "../services/highlight-service";

export const useAllHighlights = () => {
  return useQuery({
    queryKey: ["all-highlights"], // ✅ No argument needed
    queryFn: getAllHighlights,    // ✅ No params
  });
};



// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../lib/axios";

// export const useAllHighlights = () => {
//   return useQuery({
//     queryKey: ["all-highlights"],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get("/highlights");
//       return data; // grouped object: { "NEW AT JUNIOR SEAS": [ ... ], ... }
//     },
//     staleTime: 5 * 60 * 1000,
//     retry: 1,
//   });
// };




//last gpt
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const fetchHighlights = async () => {
//   const { data } = await axios.get("/api/highlights");
//   return data;
// };

// export const useHighlights = (p0: string) => {
//   return useQuery({
//     queryKey: ["highlights"],
//     queryFn: fetchHighlights,
//   });
// };



// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useHighlights = () => {
//   return useQuery({
//     queryKey: ["highlights"],
//     queryFn: async () => {
//       const { data } = await axios.get("/api/highlights");
//       return data.highlights; // grouped by section
//     },
//   });
// };




//LAST WORKING CODE
// hooks/useHighlights.ts
// import { useQuery } from "@tanstack/react-query";
// import { getHighlights } from "../services/highlight-service";

// export const useHighlights = (sectionKey: string) => {
//   return useQuery({
//     queryKey: ["highlight-section", sectionKey],
//     queryFn: () => getHighlights(sectionKey),
//   });
// };