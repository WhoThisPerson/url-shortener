import { Router } from "express";
import { HTTP_STATUS } from "../constants/http-status";

const router = Router();

// Create a shortened URL
router.post("/", (req, res) => {
    res.status(HTTP_STATUS.CREATED).json({
        message: "Created URL endpoint"
    });
});

// Get all URLS
router.get("/", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        message: "All available URLs"
    })
});

// Get specific URL details
router.get("/:id", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        message: `Get URL ${req.params.id}`
    });
});

// Delete a specific URL
router.delete("/:id", (req, res) => {
    res.status(HTTP_STATUS.NO_CONTENT).send();
})

export default router;
