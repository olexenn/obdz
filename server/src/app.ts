import express from "express";
import Controller from "./interfaces/controller.interface";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errors.middleware";
import path from "path/posix";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initMiddlewares();
    this.initStatic();
    this.initControllers(controllers);
    this.initErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App is listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initStatic() {
    this.app.use(express.static(path.join(__dirname, "static")));
    console.log("Initialized static content");
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    console.log("Initialized middlewares");
  }

  private initErrorHandler() {
    this.app.use(errorMiddleware);
    console.log("Initialized error handler");
  }

  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api/v1", controller.router);
    });
    console.log("Initialized controllers");
  }
}

export default App;
