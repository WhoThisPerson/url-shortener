import express from "express"
import cors from "cors"
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);

app.get("/", (req, res) => {
    res.send("API is Running")
})

export default app;
