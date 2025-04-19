import { Repository } from "typeorm";
import { dataSource } from "../app-data-source.js";
import { TicketData } from "../controllers/Ticket.controller.js";
import { Ticket, TicketStatus } from "../entity/Ticket.entity.js";
import { TicketNotFounddError } from "../errors/TicketNotFound.error.js";
import { User } from "../entity/User.entity.js";
import { Message } from "../entity/Message.entity.js";

type SatiziedUser = Omit<User, 'password' | 'role' | 'isAdmin'>;

type MessageSatiziedAuthor = {
  isAdmin: boolean;
} & SatiziedUser;

type SatiziedMessage = { author: MessageSatiziedAuthor } & Omit<Message, 'author'>;

type TicketWithSatiziedRequesterAndAuthor = {
  requester: SatiziedUser,
  messages: SatiziedMessage[],
} & Omit<Ticket, 'requester' | 'messages'>;

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
  ): Promise<TicketWithSatiziedRequesterAndAuthor> {
    const ticket = await this.repository.createQueryBuilder(this.getAlias())
      .leftJoinAndSelect(`${this.getAlias()}.requester`,'requester')
      .leftJoinAndSelect(`${this.getAlias()}.messages`,'messages')
      .leftJoinAndSelect(`messages.author`,'author')
      .where({ isDeleted: false, id })
      .getOne();

    if (!ticket) {
      throw new TicketNotFounddError();
    };

    return this.sanitizeTicket(ticket);
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

  public async getAll(): Promise<TicketWithSatiziedRequesterAndAuthor[]> {
    const tickets = await this.repository.createQueryBuilder(this.getAlias())
      .leftJoinAndSelect(`${this.getAlias()}.requester`,'requester')
      .leftJoinAndSelect(`${this.getAlias()}.messages`,'messages')
      .leftJoinAndSelect(`messages.author`,'author')
      .where({ isDeleted: false })
      .getMany();

    return tickets.map((t) => this.sanitizeTicket(t));
  }

  private sanitizeTicket(
    ticket: Ticket,
  ): TicketWithSatiziedRequesterAndAuthor {
    return {
      ...ticket,
      messages: ticket.messages.reverse().map(m => ({ ...m, author: this.sanitizeAuthor(m.author)})),
      requester: this.sanitizeRequester(ticket.requester),
    }
  }

  private sanitizeRequester(
    requester: User,
  ): SatiziedUser {
    const { password, role, ...sanitizedData } = requester;

    return sanitizedData;
  }

  private sanitizeAuthor(
    requester: User,
  ): MessageSatiziedAuthor {
    const isAdmin = requester.isAdmin();
    const { password, role,  ...sanitizedData } = requester;


    return { ...sanitizedData, isAdmin };
  }

  public async updateOne(
    ticketId: number,
    newStatus: TicketStatus,
  ): Promise<void> {
    await this.repository.createQueryBuilder(this.getAlias())
      .update(Ticket)
      .set({ status: newStatus })
      .where("id = :id", { id: ticketId })
      .execute()
  }
}

export const TicketService = new TicketServiceImpl();
