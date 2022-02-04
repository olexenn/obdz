import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  console.log("Gotch ya");
  res.json({ msg: "Hello World" });
};
