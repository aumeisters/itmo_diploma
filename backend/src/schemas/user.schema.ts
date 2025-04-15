import Joi from "joi";

export const createUserSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
})
