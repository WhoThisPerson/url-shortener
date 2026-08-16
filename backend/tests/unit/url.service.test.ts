import { describe, expect, it } from "vitest";
import * as urlService from "../../src/services/url.services.js";

describe("URL Service", () => {

    describe("createUrl", () => {

        it("creates a shortened URL", async () => {
            const url = await urlService.createUrl("https://www.google.com");

            expect(url.originalUrl).toBe("https://www.google.com");
            expect(url.shortCode).toBeTruthy();
            expect(url.clickCount).toBe(0);
            expect(url.createdAt).toBeInstanceOf(Date);
        });

    });

    describe("getAllUrls", () => {

        it("returns all stored URLs", async () => {
            const urls = await urlService.getAllUrls();

            expect(urls.length).toBeGreaterThan(0);
        });

    });

    describe("resolveShortCode", () => {

        it("finds a URL using its short code and increments its click count", async () => {
            const created = await urlService.createUrl("https://www.github.com");

            expect(created.originalUrl).toBe("https://www.github.com");
            expect(created.shortCode).toBeTruthy();
            expect(created.clickCount).toBe(0);
            expect(created.createdAt).toBeInstanceOf(Date);

            const url = await urlService.resolveShortCode(created.shortCode);

            expect(url).toBeDefined();
            expect(url?.originalUrl).toBe("https://www.github.com");
            expect(url?.clickCount).toBe(1);
        });

        it("returns null when the short code does not exist", async () => {
            const url = await urlService.resolveShortCode("ASDJKNASJDKNKJNWJKANSD");

            expect(url).toBeNull();
        });

    });

    describe("deleteUrl", () => {

        it("deletes an existing URL", async () => {
            const url = await urlService.createUrl("https://www.youtube.com/");

            expect(url.originalUrl).toBe("https://www.youtube.com/");
            expect(url.shortCode).toBeTruthy();
            expect(url.clickCount).toBe(0);
            expect(url.createdAt).toBeInstanceOf(Date);

            const result = await urlService.deleteUrl(url.id);

            expect(result).toBe(true);
            expect(
                await urlService.resolveShortCode(url.shortCode)
            ).toBeNull();
        });

        it("returns false when the ID does not exist", async () => {
            const result = await urlService.deleteUrl(999999);

            expect(result).toBe(false);
        });

    });

});