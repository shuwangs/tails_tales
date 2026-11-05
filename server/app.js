import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/authRoute.js";
import { requireAuth } from "./middleware/auth.js";
import errorHandler from "./middleware/errorHandler.js";
import aiRoute from "./routes/aiRoute.js";
import entriesRoute from "./routes/entriesRoute.js";
import petsRoute from "./routes/petsRoute.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use("/api/auth", authRoute);

app.use("/api", requireAuth);

app.use("/api/entries", entriesRoute);
app.use("/api/pets", petsRoute);
app.use("/api/ai", aiRoute);
app.use(errorHandler);
export default app;
