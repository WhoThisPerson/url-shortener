import { describe, expect, it } from "vitest";
import { createUrl, getAllUrls, resolveShortCode, deleteUrl } from "../../src/services/url.services.js";

describe("URL Service", () => {

    describe("createUrl", () => {

        it("creates a shortened URL", () => {
            const url = createUrl("https://www.google.com");

            expect(url.originalUrl).toBe("https://www.google.com");
            expect(url.shortCode).toBeTruthy();
            expect(url.clickCount).toBe(0);
            expect(url.createdAt).toBeInstanceOf(Date);
        });

    });

    describe("getAllUrls", () => {

        it("returns all stored URLs", () => {
            const urls = getAllUrls();

            expect(urls.length).toBeGreaterThan(0);
        });

    });

    describe("resolveShortCode", () => {

        it("finds a URL using its short code and increments its click count", () => {
            const created = createUrl("https://www.github.com");

            const url = resolveShortCode(created.shortCode);

            expect(url).toBeDefined();
            expect(url?.originalUrl).toBe("https://www.github.com");
            expect(created.clickCount).toBe(1);
        });

        it("returns undefined when the short code does not exist", () => {
            const url = resolveShortCode("ASDJKNASJDKNKJNWJKANSD");

            expect(url).toBeUndefined();
        });

    });

    describe("deleteUrl", () => {

        it("deletes an existing URL", () => {
            const url = createUrl("https://www.youtube.com/");

            expect(url.originalUrl).toBe("https://www.youtube.com/");
            expect(url.shortCode).toBeTruthy();
            expect(url.clickCount).toBe(0);
            expect(url.createdAt).toBeInstanceOf(Date);

            const result = deleteUrl(url.id);

            expect(result).toBe(true);
            expect(
                resolveShortCode(url.shortCode)
            ).toBeUndefined();
        });

        it("returns false when the ID does not exist", () => {
            const result = deleteUrl(999999);

            expect(result).toBe(false);
        });

    });

});