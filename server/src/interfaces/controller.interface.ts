import { Router } from "express";

interface Controller {
  /**
   * @property path: path to file
   */
  path: string;

  /**
   * @property router: Express Router instance
   *                   with routes for controller
   */
  router: Router;
}

export default Controller;
