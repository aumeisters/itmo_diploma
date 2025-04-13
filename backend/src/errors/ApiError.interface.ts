export enum StatusCodes {
  BAD_REQUEST = 400,
  FORBIDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface ApiError extends Error {
  statusCode: StatusCodes;
};
