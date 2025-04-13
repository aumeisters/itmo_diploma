import { Request, Response, NextFunction } from "express"
import { ForbiddenError } from "../errors/Forbidden.error.js";

export const adminRoleValidator = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = res.locals.user;

  if (!user?.isAdmin()) {
    throw new ForbiddenError();
  }
    
  next();
}