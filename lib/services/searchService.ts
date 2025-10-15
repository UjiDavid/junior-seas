'use server';
import { createClient } from './server';
export const searchProductsService = async (
  query: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, images, category, variants')
    .or(
      `name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`
    )
    .ilike('name', `%${query}%`)
    .limit(10); // only top 10 suggestions

  if (error) throw error;

  // 🔹 Extract a representative image + price for clean results
  const refined = data.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: p.variants?.[0]?.price ?? null,
    image:
      (Array.isArray(p.images) && p.images.length > 0
        ? p.images[0]
        : p.variants?.[0]?.image) ?? null,
  }));

  return refined;
};
