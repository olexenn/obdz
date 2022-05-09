import { NextFunction, Request, Response, Router } from "express";
import CreateExtractDto from "../dtos/create-extract.dto";
import HttpException from "../exceptions/HttpException";
import Controller from "../interfaces/controller.interface";
import AuthMiddleware from "../middlewares/admin.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import ExtractService from "../services/extract.service";
import UserService from "../services/user.service";
import Logger from "../utils/logger.util";

class ExtractController implements Controller {
  public path = "/extracts";
  public router = Router();
  public extractService = new ExtractService();
  public userService = new UserService();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/create`, [
      this.authMiddleware.isAdmin,
      validationMiddleware(CreateExtractDto),
      this.create,
    ]);

    this.router.get(`${this.path}/single`, [
      this.authMiddleware.isAuthorized,
      this.getSingle,
    ]);

    this.router.get(`${this.path}/all`, [
      this.authMiddleware.isAdmin,
      this.getAll,
    ]);
  }

  private create = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateExtractDto = req.body;
    let user;

    try {
      user = await this.userService.getUser(data.username);
    } catch (e) {
      next(new HttpException(400, "No user with given username"));
      return;
    }

    try {
      const extract = await this.extractService.createExtract(
        data.number,
        data.qualification,
        data.applicantFirstName,
        data.applicantLastName,
        data.description,
        data.authority,
        user
      );
      Logger.info(`Created extract with number: ${extract.number}`);
      res.json({ extract });
    } catch (e) {
      next(new HttpException(500, "Erro on creating extract"));
    }
  };

  private getSingle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const extract = await this.extractService.getSingle(req.user);
    Logger.info(`Sending extract for user: ${req.user.username}`);
    res.json({ extract });
  };

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    const extracts = await this.extractService.getAll();
    Logger.info("Sending all extracts to admin");
    res.json(extracts);
  };
}

export default ExtractController;
