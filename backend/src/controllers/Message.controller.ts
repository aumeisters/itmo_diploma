import { NextFunction, Request, Response } from "express"
import { MessageService } from "../services/Message.service.js";

export type MessageData = {
  ticketId: number;
  message: string;
}

class MessageControllerImpl {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authorId = res.locals.user.id;

      const messageData: MessageData = req.body;
      await MessageService.create({ ...messageData, authorId });

      res.status(201).json();
    } catch(err) {
      next(err);
    }
  }
}

export const MessageController = new MessageControllerImpl();
