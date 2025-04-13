import { Router } from "express";
import { AuthorizationController } from "../controllers/Authorization.controller.js";

export const AuthorizationRouter = Router();

AuthorizationRouter.post('/', AuthorizationController.authorize);
