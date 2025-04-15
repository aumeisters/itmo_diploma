import Joi from "joi";

export const authorizationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
