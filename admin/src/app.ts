// src/app.ts
import express from 'express';
import cors from 'cors';
import heroCarouselRoute from "./routes/heroCarouselRoute.js";
import feedCarouselRoute from "./routes/feedCarouselRoute.js"
import categoryRoute from "./routes/categoryRoute.js";
import highlightsRoute from "./routes/highlightsRoute.js";
import productsRoute from './routes/productsRoute.js';
import searchRoutes from "./routes/searchRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/hero-carousel", heroCarouselRoute);
app.use("/api/feed-carousel", feedCarouselRoute); // All feed carousel routes will be prefixed with /api
app.use("/api/categories", categoryRoute);
app.use("/api/products", productsRoute);
app.use("/api/highlights", highlightsRoute);
app.use("/api/search", searchRoutes);


app.get('/', (_req, res) => {
  res.send('API is running...');
});

export default app;
// This file sets up the Express application, enabling CORS and JSON parsing.
// It also defines a simple route that responds with a message indicating the API is running.