import { ApiError, StatusCodes } from "./ApiError.interface.js";

export class TicketNotFounddError implements ApiError {
  public readonly name = 'TicketNotFounddError';
  public readonly message = 'Ticket not found';
  public readonly statusCode: StatusCodes = StatusCodes.NOT_FOUND;
}