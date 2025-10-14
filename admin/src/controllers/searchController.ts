import { RequestHandler } from "express";
import { supabase } from "../lib/supabase.js";
import { searchProductsService } from "../services/searchService";

export const searchProducts: RequestHandler = async (req, res) => {
  try {
    const q = req.query.q ? String(req.query.q) : "";
    if (!q) {
      res.json({ products: [] });
      return;
    }

    const results = await searchProductsService(q);
    // Log search query to search_history table
    await supabase.from("search_history").insert([
      {
        query: q,
        user_id: null, // or req.user?.id if you have auth
        product_id: results?.[0]?.id || null, // optional: first match
      },
    ]);
    res.status(200).json({ products: results });
  } catch (error: any) {
    console.error("❌ Error in searchProducts:", error.message || error);
    res.status(500).json({ error:error.message || "Search failed" });
  }
};
