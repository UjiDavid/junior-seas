import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/select-category-service';

interface Category {
  image_url: string;
  title: string | undefined;
  _id: string;
  name: string;
  image?: string;
  // Add more fields if needed
}

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};
