/**
 * Represents the intended structure of how URL infor will be stored
 */
interface ShortendURL {
    id: number;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
    createdAt: Date;
}

// Will act as the temporary storage for URLs until DB is set up
const url: ShortendURL[] = []

/**
 * @param originalUrl - the original URL meant to be shortened
 * @returns the shortened URL
 */
function createUrl(originalUrl: string): string {
    return ""
}

/**
 * Will return all listed URLs stored
 */
function getAllUrls() {

}

/**
 * Will find a URL
 * @param shortUrl - the short URL to be searcched
 * @returns the 
 */
function findByShortUrl(shortUrl: string): string {
    return ""
}

/**
 * Will find a URL and increment the click counted
 * @param shortUrl - the short URL to be searched
 */
function incrementClickCount(shortUrl: string) {

}
