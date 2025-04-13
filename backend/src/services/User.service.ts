import { Repository } from "typeorm";
import bcrypt from 'bcrypt';
import { dataSource } from "../app-data-source.js";
import { UserData } from "../controllers/User.controller.js";
import { Roles, User } from "../entity/User.entity.js";
import { UserNotFoundError } from "../errors/UserNotFound.error.js";

class UserServiceImpl {

  private readonly repository: Repository<User>;
  
  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  public async getById(
    userId: number,
  ): Promise<User> {
    const user = await this.repository.findOneBy({
      id: userId,
      isDeleted: false,
    })

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  public async create(
    userData: UserData,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.repository.create({
      ...userData,
      role: Roles.USER,
      password: hashedPassword,
    });
    
    await this.repository.save(user)
  }
}

export const UserService = new UserServiceImpl();