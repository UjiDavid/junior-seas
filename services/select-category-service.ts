// services/category.service.ts
import axiosInstance from "../lib/axios";

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data?.categories ?? [];
};