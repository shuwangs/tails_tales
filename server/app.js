import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import entriesRoute from "./routes/entriesRoute.js";
import petsRoute from "./routes/petsRoute.js";
import aiRoute from "./routes/aiRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/entries", entriesRoute);
app.use("/api/pets", petsRoute);
app.use("/api/ai", aiRoute);
app.use(errorHandler);
export default app;
