import { Request, Response, NextFunction } from "express"
import { ApiError } from "../errors/ApiError.interface.js";

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const DEFAULT_STATUS_CODE = 500;
  const DEFAULT_ERROR_MESSAGE = 'Internal Server Error';

  console.error(err.name);
  console.error(err.stack);

  res.status(err.statusCode || DEFAULT_STATUS_CODE).json({ error: err.message ||  DEFAULT_ERROR_MESSAGE });
}