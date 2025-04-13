import { NextFunction, Request, Response } from "express"
import { AutorizationService } from "../services/Authorization.service.js";

export type AuthData = {
  email: string;
  password: string;
}

class AuthorizationControllerImlp {
  public async authorize(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authData: AuthData = req.body;

      const { token, role } = await AutorizationService.auhtorize(authData);
      res.status(200).json({ token, role })
    } catch (err) {
      next(err);
    }
  }
}

export const AuthorizationController = new AuthorizationControllerImlp();
