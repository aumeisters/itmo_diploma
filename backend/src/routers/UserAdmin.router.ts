import { Router } from "express";
import { validateRequestParams } from "../middleware/validateRequest.middleware.js";
import { getTicketSchema } from "../schemas/ticket.schema.js";
import { UserController } from "../controllers/User.controller.js";

export const UserAdminRouter = Router();

UserAdminRouter.get('/:id', validateRequestParams(getTicketSchema), UserController.getOneById);
