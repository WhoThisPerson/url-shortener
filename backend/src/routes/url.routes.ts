import { Router } from "express";
import { createUrl, getAllUrls, resolveShortUrl, deleteUrl } from "../controllers/url.controllers.js";

const router = Router();

// Create a shortened URL
router.post("/", createUrl);

// Get all URLS
router.get("/", getAllUrls);

// Get specific URL details
router.get("/:shortUrl", resolveShortUrl);

// Delete a specific URL
router.delete("/:id", deleteUrl);

export default router;
