import { Repository } from "typeorm";
import { dataSource } from "../app-data-source.js";
import { TicketData } from "../controllers/Ticket.controller.js";
import { Ticket, TicketStatus } from "../entity/Ticket.entity.js";
import { TicketNotFounddError } from "../errors/TicketNotFound.error.js";
import { User } from "../entity/User.entity.js";

export type TicketSatiziedRequester = Omit<User, 'password' | 'role' | 'isAdmin'>;

type TicketWithSatiziedRequester = Omit<Ticket, 'requester'> & { requester: TicketSatiziedRequester};

class TicketServiceImpl {

  private readonly repository: Repository<Ticket>;

  constructor() {
    this.repository = dataSource.getRepository(Ticket);
  }

  private getAlias() {
    return 'ticket';
  }
  
  public async create(
    ticketData: TicketData,
  ): Promise<void> {
    const user = this.repository.create({
      ...ticketData,
      status: TicketStatus.CREATED,
    });

    await this.repository.save(user)
  }

  public async getOneById(
    id: number,
  ): Promise<TicketWithSatiziedRequester> {
    const ticket = await this.repository.createQueryBuilder(this.getAlias())
      .leftJoinAndSelect(`${this.getAlias()}.requester`,'requester')
      .where({ isDeleted: false, id })
      .getOne();

    if (!ticket) {
      throw new TicketNotFounddError();
    };

    return {
      ...ticket,
      requester: this.sanitizeRequester(ticket.requester),
    }
  }

  public async getManyByRequesterId(
    requesterId: number,
  ): Promise<Ticket[]> {
    return await this.repository.createQueryBuilder(this.getAlias())
      .leftJoin(`${this.getAlias()}.requester`,'requester')
      .where({ isDeleted: false })
      .andWhere('requester.id = :id', { id: requesterId })
      .getMany();
  }

  public async getAll(): Promise<TicketWithSatiziedRequester[]> {
    const tickets = await this.repository.createQueryBuilder(this.getAlias())
      .leftJoinAndSelect(`${this.getAlias()}.requester`,'requester')
      .where({ isDeleted: false })
      .getMany();

    return tickets.map(t => ({
      ...t,
      requester: this.sanitizeRequester(t.requester),
    }));
  }

  private sanitizeRequester(
    requester: User,
  ): TicketSatiziedRequester {
    const { password, role,  ...sanitizedData } = requester;

    return sanitizedData;
  }
}

export const TicketService = new TicketServiceImpl();
