import { ObjectSchema } from "joi"
import { Request, Response, NextFunction } from "express"

export const validateRequestBody = (
  schema: ObjectSchema,
) => async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  await schema.validateAsync(req.body)
  next();
}

export const validateRequestParams = (
  schema: ObjectSchema,
) => async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  await schema.validateAsync(req.params)
  next();
}
