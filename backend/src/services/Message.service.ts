import { Repository } from "typeorm";
import { dataSource } from "../app-data-source.js";
import { Message } from "../entity/Message.entity.js";
import { MessageData } from "../controllers/Message.controller.js";

type CreateMessageData = {
  authorId: number;
} & MessageData;

class MessageServiceImpl {

  private readonly repository: Repository<Message>;
  
  constructor() {
    this.repository = dataSource.getRepository(Message);
  }

  public async create(
    messageData: CreateMessageData,
  ): Promise<void> {
    const message = this.repository.create(messageData);
    
    await this.repository.save(message)
  }
}

export const MessageService = new MessageServiceImpl();