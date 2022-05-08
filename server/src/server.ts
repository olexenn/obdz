import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./app";
import ExtractController from "./controllers/extract.controller";
import UserController from "./controllers/user.controller";

createConnection().then(() => {
  const app = new App([new UserController(), new ExtractController()]);

  app.listen();
});
