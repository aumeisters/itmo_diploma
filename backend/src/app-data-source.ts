import { DataSource } from "typeorm"
import { User } from "./entity/User.entity.js";
import { config } from "./configuration/config.js";
import { Ticket } from "./entity/Ticket.entity.js";
import { Message } from "./entity/Message.entity.js";

export const dataSource = new DataSource({
  type: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, Ticket, Message],
  logging: false,
  synchronize: true,
});
