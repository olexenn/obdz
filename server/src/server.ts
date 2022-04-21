import "reflect-metadata";
import { createConnection } from "typeorm";
import App from "./app";
import UserController from "./controllers/user.controller";

createConnection().then(() => {
  const app = new App([new UserController()]);

  app.listen();
});
