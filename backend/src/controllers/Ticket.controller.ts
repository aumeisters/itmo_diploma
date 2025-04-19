import { NextFunction, Request, Response } from "express"
import { TicketService } from "../services/Ticket.service.js";
import { ForbiddenError } from "../errors/Forbidden.error.js";
import { TicketStatus } from "../entity/Ticket.entity.js";
import { MessageService } from "../services/Message.service.js";

export type TicketData = {
  title: string;
  issue: string;
  requesterId: number;
}

class TicketControllerImp {

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const requesterId = res.locals.user.id;
      const ticketData: TicketData = req.body;
  
      await TicketService.create({ ...ticketData, requesterId});
  
      res.status(201).json();
    } catch(err) {
      next(err);
    }
  }

  public async getOneById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const ticketId = Number(req.params.id);
      const ticket = await TicketService.getOneById(ticketId);

      const requester = res.locals.user;

      if (!requester.isAdmin() && requester.id !== ticket.requester.id) {
        throw new ForbiddenError();
      }
  
      res.status(200).json({ ticket });
    } catch(err) {
      next(err);
    }
  }

  public async getMany(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const requesterId = res.locals.user.id;
      const tickets = await TicketService.getManyByRequesterId(requesterId);
  
      res.status(200).json({ tickets });
    } catch(err) {
      next(err);
    }
  }

  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tickets = await TicketService.getAll();
  
      res.status(200).json({ tickets });
    } catch(err) {
      next(err);
    }
  }

  public async updateOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const requesterId = res.locals.user.id;
      const ticketId = Number(req.params.id);
      const { newStatus }: { newStatus: TicketStatus } = req.body;

      await TicketService.updateOne(ticketId, newStatus);


      await MessageService.create({
        authorId:requesterId,
        ticketId,
        message: `Статус тикета обновлен: ${newStatus}`
      })
  
      res.status(200).json();
    } catch(err) {
      next(err);
    }
  }
}

export const TicketController = new TicketControllerImp();
