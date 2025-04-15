import Joi from "joi";

export const createTicketSchema = Joi.object({
  title: Joi.string().required().max(100).min(3),
  issue: Joi.string().required().max(500).min(3),
});

export const getTicketSchema = Joi.object({
  id: Joi.number().required(),
})
