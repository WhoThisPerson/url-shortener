import { Router } from "express";
import * as urlController from "../controllers/url.controllers.js";

const router = Router();

router.get("/:shortCode", urlController.resolveShortCode);

export default router;
