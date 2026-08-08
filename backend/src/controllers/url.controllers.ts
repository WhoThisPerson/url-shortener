import type { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.js";
import { createUrl as createUrlService, getAllUrls as getAllUrlsService, resolveShortCode as resolveShortCodeService, deleteUrl as deleteUrlService } from "../services/url.services.js";

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
export function createUrl(req: Request, res: Response) {

    const { originalUrl } = req.body;

    if (!originalUrl) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "originalUrl is required"
        });
        return;
}

    const shortenedUrl = createUrlService(originalUrl);

    res.status(HTTP_STATUS.CREATED).json(shortenedUrl);
}

/**
 * Will call the getAllUrl function from the Service repository
 * and execute the code to retrieve all URLs stored
 * @param req - request body
 * @param res - response body
 */
export function getAllUrls(req: Request, res: Response) {

    const urls = getAllUrlsService();

    res.status(HTTP_STATUS.OK).json(urls);
}

/**
 * Will call the resolveShortCode function from the Service repository
 * and execute the code to retrieve a short url + increment its click count
 * @param req - request body
 * @param res - response body
 */
export function resolveShortCode(req: Request, res: Response) {
    const { shortCode } = req.params;

    if (typeof shortCode !== "string") {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid short code"
        });
        return;
    }

    const url = resolveShortCodeService(shortCode);

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
export function deleteUrl(req: Request, res: Response) {

    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid id"
        });
        return;
    }

    const found = deleteUrlService(id);

    if (!found) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "ID of URL not found"
        });
        return;
    }

    res.status(HTTP_STATUS.NOT_FOUND).send();

}