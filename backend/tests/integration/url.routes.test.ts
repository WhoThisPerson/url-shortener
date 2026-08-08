import request from "supertest";
import { describe, expect, it } from "vitest";
import { createUrl, getAllUrls, resolveShortCode, deleteUrl } from "../../src/services/url.services.js";
import app from "../../src/app.js";

// Test if server is properly running
describe("Backend App Test", () => {
    it("should return API is running", async () => {
        const response = await request(app).get("/");

        expect(response.text).toBe("API is Running");
    });
});

//WILL TEST HTTP RESPONSE ROUTES
// describe("Routes", () => {


// })
