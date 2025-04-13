import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UserService } from "../services/User.service.js";
import { ForbiddenError } from "../errors/Forbidden.error.js";
import { InvalidTokenError } from "../errors/InvalidToken.error.js";
import { config } from "../configuration/config.js";

export const authorizationValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ForbiddenError();
  }

  try {
    const { userId } =  jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    const user = await UserService.getById(userId);

    res.locals.user = user;

    next();
  } catch (err) {
    console.log(err)
    throw new InvalidTokenError();
  }
}