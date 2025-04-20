import { NextFunction, Request, Response } from "express"
import { UserService } from "../services/User.service.js";

export type UserData = {
  firstname: string;
  lastname: string;
  password: string;
  dateOfBirth: Date;
}

class UserControllerImp {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData: UserData = req.body;
      await UserService.create(userData);
  
      res.status(201).json();
    } catch(err) {
      next(err);
    }
  }

  public async getOneById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const user = await UserService.getById(userId);

      res.status(200).json({ user: user.getSanitized() });
    } catch(err) {
      next(err);
    }
  }
}

export const UserController = new UserControllerImp();
