import { Router } from "express";
import { createUrl, getAllUrls, resolveShortCode, deleteUrl } from "../controllers/url.controllers.js";

const router = Router();

// Create a shortened URL
router.post("/", createUrl);

// Get all URLS
router.get("/", getAllUrls);

// Get specific URL details
router.get("/:shortCode", resolveShortCode);

// Delete a specific URL
router.delete("/:id", deleteUrl);

export default router;
