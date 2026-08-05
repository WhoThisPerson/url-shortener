import type { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status.js";
import { createUrl as createUrlService, getAllUrls as getAllUrlsService, resolveShortUrl as resolveShortUrlService, deleteUrl as deleteUrlService } from "../services/url.services.js";

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


}

/**
 * Will call the resolveShortUrl function from the Service repository
 * and execute the code to retrieve a short url + increment its click count
 * @param req - request body
 * @param res - response body
 */
export function resolveShortUrl(req: Request, res: Response) {

}

/**
 * Will call the deleteUrl function from the Service repository
 * and execute the code to find and remove a URL from storage
 * @param req - request body
 * @param res - response body
 */
export function deleteUrl(req: Request, res: Response) {

}