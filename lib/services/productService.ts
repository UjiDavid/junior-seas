'use server';
import slugify from 'slugify';
import { createClient } from './server';

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
  sortOrder?: 'asc' | 'desc';
}

export const fetchSingleProduct = async (
  productId: number | string
) => {
  const supabase = await createClient();

  // Use the .select('*') and .eq() method to filter by the product ID
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId) // Assuming 'id' is the unique column name
    .single(); // Use .single() to expect 0 or 1 row and return an object instead of an array

  if (error) {
    console.error(
      `❌ Supabase fetchSingleProduct error for ID ${productId}:`,
      error.message
    );
    throw error;
  }

  // data will be the product object or null if not found
  return data;
};

export const fetchProducts = async (
  params: ProductQueryParams = {}
) => {
  const supabase = await createClient();
  const {
    page = 1,
    limit = 20,
    category,
    price_min,
    price_max,
    ram,
    rom,
    color,
    search,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = params;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  // ✅ Top-level filters
  if (category)
    query = query.ilike('category', `%${category}%`);
  if (search) query = query.ilike('name', `%${search}%`);

  // ✅ Variant filters (JSONB)
  let variantFilter: any = {};
  if (ram) variantFilter.ram = ram;
  if (rom) variantFilter.rom = rom;
  if (color) variantFilter.color = color;

  if (Object.keys(variantFilter).length > 0) {
    query = query.contains('variants', [variantFilter]);
  }

  // ✅ Sorting
  query = query.order(sortBy, {
    ascending: sortOrder === 'asc',
  });

  // ✅ Pagination
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) {
    console.error(
      '❌ Supabase fetchProducts error:',
      error.message
    );
    throw error;
  }

  // ⚠️ Price filtering in JSONB is tricky → do it in-memory
  let filteredData = data || [];
  if (price_min !== undefined || price_max !== undefined) {
    filteredData = filteredData.filter((product: any) => {
      // Assume each product has `variants` array with objects containing `price`
      return product.variants.some(
        (v: any) =>
          (!price_min || v.price >= price_min) &&
          (!price_max || v.price <= price_max)
      );
    });
  }

  return { data: filteredData, count };
};

// ✅ Create Product
export const createProduct = async (product: any) => {
  const supabase = await createClient();
  const slug = slugify(product.name, { lower: true });
  const { data, error } = await supabase
    .from('products')
    .insert([{ ...product, slug }])
    .single();
  if (error) throw error;
  return data;
};

// ✅ Update Product
export const updateProduct = async (
  id: string,
  product: any
) => {
  const supabase = await createClient();
  const updateData = { ...product };
  if (product.name) {
    updateData.slug = slugify(product.name, {
      lower: true,
    });
  }
  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};
