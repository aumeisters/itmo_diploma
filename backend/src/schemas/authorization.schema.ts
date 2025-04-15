import Joi, { ObjectSchema } from "joi";

export const authorizationSchema: ObjectSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
