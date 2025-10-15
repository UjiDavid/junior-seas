import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { useEffect, useState } from 'react';

const fetchSearchResults = async (query: string) => {
  if (!query?.trim()) return [];
  // debug: remove in production
  // console.log("SEARCH REQUEST:", query);
  const { data } = await axiosInstance.get(
    `/search?q=${encodeURIComponent(query)}`
  );
  // console.log("SEARCH DATA:", data);
  return data?.products ?? [];
};

// Custom hook with debounce
export const useSearchProducts = (searchText: string) => {
  const [debouncedQuery, setDebouncedQuery] =
    useState(searchText);

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedQuery(searchText),
      400
    );
    return () => clearTimeout(timeout);
  }, [searchText]);

  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: !!debouncedQuery?.trim(),
    staleTime: 1000 * 30,
  });
};

// // src/hooks/useSearchProducts.ts
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../lib/axios";

// const fetchSearchResults = async (query: string) => {
//   if (!query.trim()) return [];
//   const { data } = await axiosInstance.get(`/api/search?q=${query}`);
//   return data.products || [];
// };

// export const useSearchProducts = (searchText: string) => {
//   return useQuery({
//     queryKey: ["search", searchText],
//     queryFn: () => fetchSearchResults(searchText),
//     enabled: !!searchText.trim(),
//     staleTime: 1000 * 30, // cache for 30 seconds
//   });
// };
