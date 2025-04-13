import { ApiError, StatusCodes } from "./ApiError.interface.js";

export class IncorrectPasswordError implements ApiError {
  public readonly name = 'IncorrectPasswordError';
  public readonly message = 'Incorrect password';
  public readonly statusCode: StatusCodes = StatusCodes.FORBIDEN;
}