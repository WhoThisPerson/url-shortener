import { Router } from "express";
import * as urlController from "../controllers/url.controllers.js";

const router = Router();

// Create a shortened URL
router.post("/", urlController.createUrl);

// Get all URLS
router.get("/", urlController.getAllUrls);

// Delete a specific URL
router.delete("/:id", urlController.deleteUrl);

export default router;
