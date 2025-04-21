import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
})

export const getUserSchema = Joi.object({
  id: Joi.number().required(),
})
