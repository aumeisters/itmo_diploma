import { Router } from "express";
import { TicketController } from "../controllers/Ticket.controller.js";

export const TicketAdminRouter = Router();

TicketAdminRouter.get('/', TicketController.getAll);
