import { Router } from "express";
import * as controller from "./controllers/index.controller";

export const routes = Router();
routes.get("/", controller.index);
