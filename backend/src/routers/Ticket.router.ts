import { Router } from "express";
import { TicketController } from "../controllers/Ticket.controller.js";

export const TicketRouter = Router();

TicketRouter.post('/', TicketController.create);
TicketRouter.get('/:id', TicketController.getOneById);
TicketRouter.get('/', TicketController.getMany);
