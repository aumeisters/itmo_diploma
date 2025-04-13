import { ApiError, StatusCodes } from "./ApiError.interface.js";

export class InvalidTokenError implements ApiError {
  public readonly name = 'InvalidTokenError';
  public readonly message = 'Invalid token';
  public readonly statusCode: number = StatusCodes.BAD_REQUEST;
}