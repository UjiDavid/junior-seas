import { createClient } from './server';

export const fetchAllHighlights = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .not('highlight_section', 'is', null)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const grouped: Record<string, any[]> = {};
  (data || []).forEach((p: any) => {
    const section = (
      p.highlight_section ?? 'OTHERS'
    ).trim();
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(p);
  });
  return grouped;
};

//2ND EDIT ATTEMPT
// import { supabase } from "../lib/supabase.js";

// export const fetchHighlights = async (section: string) => {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .eq("highlight_section", section);

//   if (error) throw error;
//   return data;
// };

//INITIAL CODE
// import { supabase } from "../lib/supabase.js";

// export const fetchHighlights = async (section: string) => {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .eq("highlight_section", section);

//   if (error) throw error;
//   return data;
// };
