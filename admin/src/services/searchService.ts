// src/services/searchService.ts
import { supabase } from "../lib/supabase.js";

export const searchProductsService = async (query: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, images, category, variants")
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`)
    .ilike("name", `%${query}%`)
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
//     // extract lowest price safely
//   const formatted = data.map((p) => {
//     let price = null;
//     if (p.variants && Array.isArray(p.variants) && p.variants.length > 0) {
//       const prices = p.variants.map((v: any) => v.price).filter(Boolean);
//       price = Math.min(...prices);
//     }
//     return { ...p, price };
//   });

//   return formatted;
};






// import { supabase } from "../lib/supabase.js";

// export const fetchSearchResults = async (query: string) => {
//   const { data, error } = await supabase
//     .from("products")
//     .select("id, name, slug, price, images")
//     .ilike("name", `%${query}%`)
//     .limit(10);

//   if (error) {
//     console.error("Supabase search error:", error.message);
//     throw error;
//   }

//   return data || [];
// };
