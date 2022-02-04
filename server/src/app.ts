import express from "express";
import { routes } from "./routes";

export const app = express();

app.set("port", process.env.PORT || 3001);
app.use("/api/v1/", routes);
