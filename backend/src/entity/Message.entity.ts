import { Entity, Column, ManyToOne } from "typeorm"
import { AbstractEntity } from "./Abstract.entity.js";
import { User } from "./User.entity.js";
import { Ticket } from "./Ticket.entity.js";

@Entity('message')
export class Message extends AbstractEntity {
  @ManyToOne((type) => User, (user) => user.id)
  author!: User;

  @ManyToOne((type) => Ticket, (ticket) => ticket.messages)
  ticket!: number;

  @Column({
    length: 500,
  })
  message!: string;
}