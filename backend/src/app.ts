import express from "express"
import cors from "cors"
import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/urls", urlRoutes);

app.get("/", (req, res) => {
    res.send("API is Running")
})

export default app;
