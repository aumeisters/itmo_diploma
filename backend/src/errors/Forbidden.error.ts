import { ApiError, StatusCodes } from "./ApiError.interface.js";

export class ForbiddenError implements ApiError {
  public readonly name = 'ForbiddenError';
  public readonly message = 'Forbidden resource';
  public readonly statusCode: StatusCodes = StatusCodes.FORBIDEN;
}