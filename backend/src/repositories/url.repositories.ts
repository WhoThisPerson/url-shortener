import type { ShortenedUrl } from "../types/shortened-url.js";
import pool from "../db/pool.js";

/**
 * Takes results from a database query and converts it into a ShortenedUrl object
 * @param row - results of query
 * @returns - Contents of query in ShortenedURL format
 */
function rowToShortenedUrl(row: any): ShortenedUrl {
    return {
        id: row.id,
        originalUrl: row.original_url,
        shortCode: row.short_code,
        clickCount: row.click_count,
        createdAt: row.created_at
    };
}

/**
 * Creates a new shortened URL entry in the database
 * @param originalUrl - the full URL to be shortened
 * @param shortCode - the desired short code for the URL
 * @returns - The created ShortenedUrl object
 */
export async function createUrl(originalUrl: string, shortCode: string): Promise<ShortenedUrl> {
    const query = `INSERT INTO urls
        (original_url, short_code) 
        VALUES ($1, $2)
        RETURNING id, original_url, short_code, click_count, created_at;`;
    
    const result = await pool.query(query, [originalUrl, shortCode]);

    const row = result.rows[0];
    
    return rowToShortenedUrl(row);
}

/**
 * Queries the database to retrieve all URLs stored within the database
 * @returns - Array of ShortenedUrl objects
 */
export async function getAllUrls(): Promise<ShortenedUrl[]> {
    const query = `SELECT
        id, original_url, short_code, click_count, created_at
        FROM urls;`;
    
    const result = await pool.query(query);

    return result.rows.map(row => rowToShortenedUrl(row));
}

/**
 * Finds the URL by its short code and increments the click count
 * @param shortCode - the short code to be searched
 * @returns - The found URL or null if not found
 */
export async function resolveShortCode(shortCode: string): Promise<ShortenedUrl | null> {
    const query = `UPDATE urls
        SET click_count = click_count + 1
        WHERE short_code = $1
        RETURNING id, original_url, short_code, click_count, created_at;`;

    const result = await pool.query(query, [shortCode]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return rowToShortenedUrl(row);
}

/**
 * Will remove a URL from the database based on its ID
 * @param id - URL's ID
 */
export async function deleteUrl(id: number): Promise<boolean> {

    const query = `DELETE FROM urls WHERE id = $1;`;

    const result = await pool.query(query, [id]);

    return result.rowCount === 1;
}
