import { Router } from "express";
import { validateRequestBody } from "../middleware/validateRequest.middleware.js";
import { MessageController } from "../controllers/Message.controller.js";
import { createMessageSchema } from "../schemas/message.schema.js";

export const MessageRouter = Router();

MessageRouter.post('/', validateRequestBody(createMessageSchema), MessageController.create);
