import express, { Application } from "express";
import cors from 'cors';
import { dataSource } from './app-data-source.js';
import { UserRouter } from './routers/User.router.js';
import { config } from "./configuration/config.js";
import { AuthorizationRouter } from "./routers/Authorization.router.js";
import { TicketRouter } from "./routers/Ticket.router.js";
import { authorizationValidator } from "./middleware/authorizationValidator.middleware.js";
import { errorHandler } from "./middleware/ErrorHandler.middleware.js";
import { adminRoleValidator } from "./middleware/adminRoleValidator.middleware.js";
import { TicketAdminRouter } from "./routers/TicketAdmin.router.js";
import { MessageRouter } from "./routers/Message.router.js";
import { UserAdminRouter } from "./routers/UserAdmin.router.js";

const app: Application = express();

app.use(express.json())
app.use(cors());

app.use('/users', UserRouter);
app.use('/authorize', AuthorizationRouter);
app.use('/tickets', authorizationValidator, TicketRouter);
app.use('/admin/tickets', authorizationValidator, adminRoleValidator, TicketAdminRouter);
app.use('/messages', authorizationValidator, MessageRouter);
app.use('/admin/users', authorizationValidator, adminRoleValidator, UserAdminRouter);

(async () => {
  try {
    await dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
      
      app.listen(config.PORT, () => {
        console.log(`Server is started at port: ${config.PORT}`);
      });
    })
    .catch((err: any) => {
      console.error("Error during Data Source initialization:", err)
    })   
  } catch (err) {
    console.log(err)
  }
})()

app.use(errorHandler)