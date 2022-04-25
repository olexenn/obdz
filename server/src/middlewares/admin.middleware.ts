import { NextFunction, Request, Response } from "express";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import UserService from "../services/user.service";
import Logger from "../utils/logger.util";

class AuthMiddleware {
  public userService = new UserService();

  public isAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.headers.authorization) {
      try {
        const user = this.userService.findUserByToken(
          req.headers.authorization
        );
        if (user) {
          req.user = await user;
          next();
        } else {
          Logger.warn("Unauthorized Call");
          next(new NotAuthorizedException());
        }
      } catch (e) {
        Logger.error(`Unauthorized Call with error: ${e}`);
        next(new NotAuthorizedException());
      }
    } else {
      Logger.warn("Unauthorized Call");
      next(new NotAuthorizedException());
    }
  };

  public isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
      try {
        const user = await this.userService.findUserByToken(
          req.headers.authorization
        );
        console.log(user);
        if (user.role === "admin") {
          next();
        } else {
          Logger.warn("Not Admin Call");
          next(new WrongAuthenticationTokenException());
        }
      } catch (e) {
        Logger.error(`Not Admin Call with error: ${e}`);
        next(new NotAuthorizedException());
      }
    } else {
      Logger.warn("Not Admin Call");
      next(new NotAuthorizedException());
    }
  };
}

export default AuthMiddleware;
