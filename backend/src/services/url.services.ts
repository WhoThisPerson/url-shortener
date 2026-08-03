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
export function encodeBase62(id: number): string {

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
export function createUrl(originalUrl: string): ShortenedURL {
    
    const id = nextId++;

    const newShortenedURL = {
        id: id,
        originalUrl: originalUrl,
        shortUrl: encodeBase62(id),
        clickCount: 0,
        createdAt: new Date()
    }

    urls.push(newShortenedURL);

    return newShortenedURL;
}

/**
 * Will return all listed URLs stored
 */
export function getAllUrls(): ShortenedURL[] {
    return urls;
}

// /**
//  * Will find a URL
//  * @param id - id of the URL to look for
//  * @returns the 
//  */
// function getById(id: number): string {
    
// }

/**
 * Will find a URL and increment the click counted
 * @param shortUrl - the short URL to be searched
 * @returns the shortened URL's details
 */
export function resolveShortURL(shortUrl: string): ShortenedURL | undefined {

    const url = urls.find(url => url.shortUrl === shortUrl);

    if (!url) return;
    

    url.clickCount++;

    return url;
}

/**
 * Will delete a URL from the table
 * @param id - id of the URL to be deleted
 * @returns true if deleted, false otherwise
 */
export function deleteURL(id: number): boolean {

    const index = urls.findIndex(url => url.id === id);

    if (index === -1) return false;

    urls.splice(index, 1);
    return true;
}
