import { Router } from "express";
import { AuthorizationController } from "../controllers/Authorization.controller.js";
import { validateRequestBody } from "../middleware/validateRequest.middleware.js";
import { authorizationSchema } from "../schemas/authorization.schema.js";

export const AuthorizationRouter = Router();

AuthorizationRouter.post('/', validateRequestBody(authorizationSchema), AuthorizationController.authorize);
