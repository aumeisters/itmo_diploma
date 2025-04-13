import { ApiError, StatusCodes } from "./ApiError.interface.js";

export class UserNotFoundError implements ApiError {
  public readonly name = 'UserNotFoundError';
  public readonly message = 'User not found';
  public readonly statusCode: StatusCodes = StatusCodes.NOT_FOUND;
}