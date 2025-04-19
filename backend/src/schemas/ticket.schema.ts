import Joi from "joi";
import { TicketStatus } from "../entity/Ticket.entity.js";

export const createTicketSchema = Joi.object({
  title: Joi.string().required().max(100).min(3),
  issue: Joi.string().required().max(500).min(3),
});

export const getTicketSchema = Joi.object({
  id: Joi.number().required(),
})

export const updateTicketSchema = Joi.object({
  newStatus: Joi.string().valid(...Object.values(TicketStatus)),
})
