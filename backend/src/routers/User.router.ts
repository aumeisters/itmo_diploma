import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";
import { validateRequestBody } from "../middleware/validateRequest.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

export const UserRouter = Router();

UserRouter.post('/', validateRequestBody(createUserSchema), UserController.create);
