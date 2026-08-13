/**
 * Represents the intended structure of how URL infor will be stored
 */
export interface ShortenedUrl {
    id: number;
    originalUrl: string;
    shortCode: string;
    clickCount: number;
    createdAt: Date;
}