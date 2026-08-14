import { Router } from "express";
import * as urlController from "../controllers/url.controllers.js";

const router = Router();

// Create a shortened URL
router.post("/", urlController.createUrl);

// Get all URLS
router.get("/", urlController.getAllUrls);

// Get specific URL details
router.get("/:shortCode", urlController.resolveShortCode);

// Delete a specific URL
router.delete("/:id", urlController.deleteUrl);

export default router;
