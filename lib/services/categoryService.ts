import { createClient } from './server';

export const fetchCategories = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  if (error)
    throw new Error(
      'Failed to fetch categories: ' + error.message
    );
  return data;
};
