import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";
import entriesRoute from "./routes/entries.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/entries", entriesRoute);

app.use(errorHandler);
export default app;
