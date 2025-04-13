import { Entity, Column, ManyToOne } from "typeorm"
import { AbstractEntity } from "./Abstract.entity.js";
import { User } from "./User.entity.js";

@Entity('message')
export class Message extends AbstractEntity {
  @ManyToOne((type) => User, (user) => user.id)
  author!: User;

  @Column()
  ticketId!: number;

  @Column({
    length: 500,
  })
  message!: string;
}