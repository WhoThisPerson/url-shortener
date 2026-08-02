import { BASE62_CHARACTERS } from "../constants/base62.js";
/**
 * Represents the intended structure of how URL infor will be stored
 */
interface ShortenedURL {
    id: number;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
    createdAt: Date;
}

// Temporarily acts as id to mimick AUTO-INCREMENT
let nextId = 1

// Will act as the temporary storage for URLs until DB is set up
const urls: ShortenedURL[] = []

/**
 * Will take the id of original URL and use it to generate
 * a base62 encoding of the URL
 * @param id - id of the original URL
 */
function encodeBase62(id: number): string {

    let short = "";

    while (id > 0) {
        short = BASE62_CHARACTERS[id % 62] + short;
        id = Math.floor(id / 62);
    }

    return short;
}

/**
 * @param originalUrl - the original URL meant to be shortened
 * @returns the ShortenedURL's information
 */
function createUrl(originalUrl: string): ShortenedURL {
    
    const id = nextId++;

    const new_shortenedURL = {
        id: id,
        originalUrl: originalUrl,
        shortUrl: encodeBase62(id),
        clickCount: 0,
        createdAt: new Date()
    }

    urls.push(new_shortenedURL);

    return new_shortenedURL;
}

/**
 * Will return all listed URLs stored
 */
function getAllUrls() {

}

/**
 * Will find a URL
 * @param id - id of the URL to look for
 * @returns the 
 */
function getById(id: number): string {
    return ""
}

/**
 * Will find a URL and increment the click counted
 * @param shortUrl - the short URL to be searched
 */
function resolveShortURL(shortUrl: string) {

}

/**
 * Will delete a URL from the table
 * @param id - id of the URL to be deleted
 * @returns true if deleted, false otherwise
 */
function deleteURL(id: number): boolean {
    return false;
}