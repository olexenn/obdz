import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import LoginDto from "../dtos/login.dto";
import RegisterDto from "../dtos/register.dto";
import HttpException from "../exceptions/HttpException";
import WrongCredentialException from "../exceptions/WrongCredentialsException";
import Controller from "../interfaces/controller.interface";
import AuthMiddleware from "../middlewares/admin.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import UserService from "../services/user.service";
import Logger from "../utils/logger.util";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  public userService = new UserService();
  public authMiddleware = new AuthMiddleware();
  public upload = multer();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto),
      this.login
    );

    this.router.get(`${this.path}/shit`, this.createSuperUser);

    this.router.post(`${this.path}/register`, [
      this.authMiddleware.isAdmin,
      validationMiddleware(RegisterDto),
      this.register,
    ]);

    this.router.get(`${this.path}/info`, [
      this.authMiddleware.isAuthorized,
      this.getInfo,
    ]);

    this.router.post(`${this.path}/pfp`, [
      this.upload.single("image"),
      this.authMiddleware.isAuthorized,
      this.updateImage,
    ]);

    this.router.get(`${this.path}/all`, [
      this.authMiddleware.isAdmin,
      this.getUsers,
    ]);
  }

  private updateImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.userService.updatePfp(req.user, req.file);
      Logger.info(`Updated pfp for user: ${req.user.id}`);
      res.json({ msg: "Successfully updated pfp" });
    } catch (e) {
      Logger.error(`Updating pfp failed: ${e}`);
      next(new HttpException(400, "No file was provided"));
    }
  };

  private getInfo = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`Send user info, user: ${req.user.id}`);
    res.json(req.user);
  };

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: RegisterDto = req.body;
    const user = await this.userService.addUser(
      data.username,
      data.password,
      data.firstName,
      data.lastName
    );
    if (!user) {
      Logger.warn(
        `Trying to create user ${data.username}, which already exists`
      );
      next(new HttpException(400, "User with this username already exists"));
    } else {
      Logger.info(`Created user: ${user.id}`);
      res.status(201).json(user);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const data: LoginDto = req.body;
    const user = await this.userService.getUser(data.username);
    if (user) {
      const tokens = await this.userService.loginUser(user, data.password);
      if (tokens) {
        const resp = {
          tokens: tokens,
          role: user.role,
        };
        Logger.info(`Successfully logged user: ${user.id} in`);
        res.json(resp);
      } else {
        Logger.warn(`Wrong credentials for login`);
        next(new WrongCredentialException());
      }
    } else {
      Logger.warn(`Wrong credentials for login`);
      next(new WrongCredentialException());
    }
  };

  private getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const users = await this.userService.getAllUsers();
    res.json(users);
  };

  private createSuperUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.saveSuperUser();
    res.json({ user: user });
  };
}

export default UserController;
