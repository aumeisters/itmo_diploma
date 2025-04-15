import { Entity, Column, ManyToOne } from "typeorm"
import { AbstractEntity } from "./Abstract.entity.js";
import { User } from "./User.entity.js";

export enum TicketStatus {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

@Entity('ticket')
export class Ticket extends AbstractEntity {  
  @ManyToOne((type) => User, (user) => user.id)
  requester!: User;

  @Column()
  title!: string;

  @Column({
    length: 500,
  })
  issue!: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.CREATED,
  })
  status!: TicketStatus;

  @Column()
  requesterId!: number;
}
