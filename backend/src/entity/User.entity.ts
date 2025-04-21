import { Entity, Column, OneToMany } from "typeorm"
import { AbstractEntity } from "./Abstract.entity.js";
import { Message } from "./Message.entity.js";
import { Ticket } from "./Ticket.entity.js";

export type SatiziedUser = Omit<User, 'password' | 'role' | 'isAdmin' | 'getSanitized'>;

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('user')
export class User extends AbstractEntity {
  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  role!: Roles;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  dateOfBirth!: Date;

  @OneToMany(() => Message, (message) => message.author)
  messages!: Message[];

  @OneToMany(() => Ticket, (ticket) => ticket.requester)
  tickets!: Ticket[];

  public isAdmin(): boolean {
    return this.role === Roles.ADMIN;
  }

  public getSanitized(): SatiziedUser {
    const { password, role, ...sanitizedData } = this;

    return sanitizedData;
  }
}
