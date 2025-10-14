// // src/routes/search.ts
// import { Router } from "express";
// import {supabase} from "../lib/supabase"; // adjust path

// const router = Router();

// router.get("/", async (req, res) => {
//   const { q } = req.query; // query param
//   if (!q) return res.json({ products: [] });

//   try {
//     const { data, error } = await supabase
//       .from("products")
//       .select("id, name, slug, price, images, category")
//       .ilike("name", `%${q}%`) // case-insensitive match

//     if (error) throw error;

//     res.json({ products: data });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;




// src/routes/searchRoute.ts
import express from "express";
import  {searchProducts}  from "../controllers/searchController";

const router = express.Router();

router.get("/", searchProducts);

export default router;
