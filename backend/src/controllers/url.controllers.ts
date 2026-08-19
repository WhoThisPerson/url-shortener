import type { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.js";
import * as urlService from "../services/url.services.js";

/**
 * Will call the createUrl function from the Service repository
 * and execute the code to create a shortened url
 * 
 * This function will receive a URL from the frontend which
 * will be shortened
 * 
 * @param req - request body
 * @param res - response body
 */
export async function createUrl(req: Request, res: Response) {

    const { originalUrl } = req.body;

    if (!originalUrl) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "originalUrl is required"
        });
        return;
}

    try {
        const shortenedUrl = await urlService.createUrl(originalUrl);

        res.status(HTTP_STATUS.CREATED).json(shortenedUrl);

    } catch (error) {
        if (error instanceof Error && error.message === "Invalid URL format") {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: error.message
            });
            return;
        }
    }
    
    // Catch any unexpected errors
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred"
    });

}

/**
 * Will call the getAllUrl function from the Service repository
 * and execute the code to retrieve all URLs stored
 * @param req - request body
 * @param res - response body
 */
export async function getAllUrls(req: Request, res: Response) {

    const urls = await urlService.getAllUrls();

    res.status(HTTP_STATUS.OK).json(urls);
}

/**
 * Will call the resolveShortCode function from the Service repository
 * and execute the code to retrieve a short url + increment its click count
 * @param req - request body
 * @param res - response body
 */
export async function resolveShortCode(req: Request, res: Response) {
    const { shortCode } = req.params;

    if (typeof shortCode !== "string") {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid short code"
        });
        return;
    }

    const url = await urlService.resolveShortCode(shortCode);

    if (!url) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Short code not found"
        });
        return;
    }

    res.redirect(url.originalUrl);
}

/**
 * Will call the deleteUrl function from the Service repository
 * and execute the code to find and remove a URL from storage
 * @param req - request body
 * @param res - response body
 */
export async function deleteUrl(req: Request, res: Response) {

    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid id"
        });
        return;
    }

    const found = await urlService.deleteUrl(id);

    if (!found) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "ID of URL not found"
        });
        return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();

}