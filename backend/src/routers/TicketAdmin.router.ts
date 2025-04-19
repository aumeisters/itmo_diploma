import { Router } from "express";
import { TicketController } from "../controllers/Ticket.controller.js";
import { validateRequestBody, validateRequestParams } from "../middleware/validateRequest.middleware.js";
import { getTicketSchema, updateTicketSchema } from "../schemas/ticket.schema.js";

export const TicketAdminRouter = Router();

TicketAdminRouter.get('/', TicketController.getAll);
TicketAdminRouter.patch('/:id', validateRequestParams(getTicketSchema), validateRequestBody(updateTicketSchema), TicketController.updateOne);
