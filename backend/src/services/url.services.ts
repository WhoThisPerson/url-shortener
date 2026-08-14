import { BASE62_CHARACTERS } from "../constants/base62.js";
import type { ShortenedUrl } from "../types/shortened-url.js";
import * as urlRepository from "../repositories/url.repositories.js";


const CODE_LENGTH = 6;
const BASE62_CHARACTERS_LENGTH = BASE62_CHARACTERS.length;

/**
 * Will generate a random Base62 short code
 */
export function encodeBase62(): string {

    let short = "";

    for (let i = 0; i < CODE_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * BASE62_CHARACTERS_LENGTH);
        short += BASE62_CHARACTERS[randomIndex];
    }

    return short;
}

/**
 * Creates a shortened URL after generating a base62 encoding of the original URL's id
 * @param originalUrl - the original URL meant to be shortened
 * @returns the ShortenedURL's information
 */
export async function createUrl(originalUrl: string): Promise<ShortenedUrl> {
    
    const shortCode = encodeBase62();

    return urlRepository.createUrl(originalUrl, shortCode);
}

/**
 * Will return all listed URLs stored
 */
export async function getAllUrls(): Promise<ShortenedUrl[]> {
    return urlRepository.getAllUrls();
}

/**
 * Will find a URL and increment the click counted
 * @param shortCode - the short code to be searched
 * @returns the shortened URL's details
 */
export async function resolveShortCode(shortCode: string): Promise<ShortenedUrl | null> {
    return urlRepository.resolveShortCode(shortCode);
}

/**
 * Calls the repository to delete a URL by its id
 * @param id - id of the URL to be deleted
 * @returns true if deleted, false otherwise
 */
export async function deleteUrl(id: number): Promise<boolean> {
    return urlRepository.deleteUrl(id);
}

