import { Router } from "express";
import { TicketController } from "../controllers/Ticket.controller.js";
import { createTicketSchema, getTicketSchema } from "../schemas/ticket.schema.js";
import { validateRequestBody, validateRequestParams } from "../middleware/validateRequest.middleware.js";

export const TicketRouter = Router();

TicketRouter.post('/', validateRequestBody(createTicketSchema), TicketController.create);
TicketRouter.get('/:id', validateRequestParams(getTicketSchema), TicketController.getOneById);
TicketRouter.get('/', TicketController.getMany);
