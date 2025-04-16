import Joi from "joi";

export const createMessageSchema = Joi.object({
  message: Joi.string().required().max(500),
  ticketId: Joi.number().required(),
})
