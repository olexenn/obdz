import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import Logger from "../utils/logger.util";

function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.error(`Error occured: ${err}`);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({ status, message });
}

export default errorMiddleware;
