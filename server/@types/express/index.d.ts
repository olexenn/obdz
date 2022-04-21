import { Express } from "express";
import { User } from "../../src/entities/user.model";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
