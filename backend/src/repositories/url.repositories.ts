import type { ShortenedUrl } from "../types/shortened-url.js";
import pool from "../db/pool.js";

/**
 * Queries the database to retrieve all URLs stored within the database
 * @returns - ShortenedUrl object
 */
export async function getAllUrls(): Promise<ShortenedUrl[]> {
    const query = `SELECT
        id, original_url, short_code, click_count, created_at
        FROM urls;`;
    
    const result = await pool.query(query);

    return result.rows.map(row => ({
        id: row.id,
        originalUrl: row.original_url,
        shortCode: row.short_code,
        clickCount: row.click_count,
        createdAt: row.created_at
    }));
}

