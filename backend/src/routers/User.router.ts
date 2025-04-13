import { Router } from "express";
import { UserController } from "../controllers/User.controller.js";

export const UserRouter = Router();

UserRouter.post('/', UserController.create);
