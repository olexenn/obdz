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
  }

  private updateImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.userService.updatePfp(req.user, req.file);
      res.json({ msg: "Successfully updated pfp" });
    } catch (e) {
      next(new HttpException(400, "No file was provided"));
    }
  };

  private getInfo = async (req: Request, res: Response, next: NextFunction) => {
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
      next(new HttpException(400, "User with this username already exists"));
    } else res.status(201).json(user);
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const data: LoginDto = req.body;
    const user = await this.userService.getUser(data.username);
    if (user) {
      const tokens = await this.userService.loginUser(user, data.password);
      if (tokens) {
        res.json(tokens);
      } else {
        next(new WrongCredentialException());
      }
    } else {
      next(new WrongCredentialException());
    }
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
