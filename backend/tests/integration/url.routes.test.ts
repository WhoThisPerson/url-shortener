import request from "supertest";
import { describe, expect, it } from "vitest";
import { HTTP_STATUS } from "../../src/constants/http-status.js";
import app from "../../src/app.js";

// Test if server is properly running
describe("Backend App Test", () => {
    it("should return API is running", async () => {
        const response = await request(app).get("/");
        
        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.text).toBe("API is Running");
    });
});

describe("URL Routes", () => {

    describe("GET category", async () => {
        it("returns all URLs", async () => {
            // Will create a URL to ensure there is at least one URL in the database
            await request(app).post("/api/urls").send({
                originalUrl: "https://www.google.com"
            });

            const response = await request(app).get("/api/urls");

            expect(response.status).toBe(HTTP_STATUS.OK);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it("redirects to the original URL when a valid short code is provided", async () => {
            const createResponse = await request(app).post("/api/urls").send({
                originalUrl: "https://www.google.com"
            });

            const shortCode = createResponse.body.shortCode;

            const response = await request(app).get(`/api/urls/${shortCode}`);

            expect(response.status).toBe(HTTP_STATUS.FOUND);
            expect(response.headers.location).toBe("https://www.google.com");
        })

        it("returns HTTP 404 NOT_FOUND when an invalid short code is provided", async () => {
            const response = await request(app).get("/api/urls/lakmsdlkasdkm");

            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
            expect(response.body.message).toBe("Short code not found");
        })

    })
    
    describe("POST category", async () => {
        it("creates a shortened URL from a valid URL", async () => {
            const response = await request(app).post("/api/urls").send({
                originalUrl: "https://www.google.com"
            });

            expect(response.status).toBe(HTTP_STATUS.CREATED);
            expect(response.body.originalUrl).toBe("https://www.google.com");
            expect(response.body.shortCode).toBeTruthy();
            expect(response.body.clickCount).toBe(0);
        });

        it("returns HTTP 400 BAD_REQUEST when there is no originalUrl", async () => {
            const response = await request(app).post("/api/urls").send({});

            expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(response.body.message).toBe("originalUrl is required");
        });

        it("returns HTTP 400 BAD_REQUEST when originalUrl is not a valid URL", async () => {
            const response = await request(app).post("/api/urls").send({
                originalUrl: "SLJKDAkaldjlakdsjakljdlk"
            });

            expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(response.body.message).toBe("Invalid URL format");
        })
    });

    describe("DELETE category", async () => {
        it("properly deletes a URL by its ID", async () => {
            // First, create a URL to ensure there is one to delete
            const createResponse = await request(app).post("/api/urls").send({
                originalUrl: "https://www.google.com"
            });

            const id = createResponse.body.id;

            // Now, delete the URL
            const deleteResponse = await request(app).delete(`/api/urls/${id}`);

            expect(deleteResponse.status).toBe(HTTP_STATUS.NO_CONTENT);
        });

        it("returns HTTP 404 NOT_FOUND when trying to delete a non-existent URL", async () => {
            const response = await request(app).delete("/api/urls/999999");

            expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
            expect(response.body.message).toBe("ID of URL not found");
        })

    });
})
