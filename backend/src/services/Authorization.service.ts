import { Repository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dataSource } from "../app-data-source.js";
import { AuthData } from "../controllers/Authorization.controller.js";
import { Roles, User } from "../entity/User.entity.js";
import { UserNotFoundError } from "../errors/UserNotFound.error.js";
import { IncorrectPasswordError } from "../errors/IncorrectPassword.error.js";
import { config } from "../configuration/config.js";

export type AuthorisationResponse = {
  token: string,
  role: Roles,
};

class AutorizationServiceImpl {
  
  private readonly userRepository: Repository<User>;
  
  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  public async auhtorize({
    email,
    password,
  }: AuthData): Promise<AuthorisationResponse> {
    const user = await this.userRepository.findOneBy({
      email,
      isDeleted: false,
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.checkPasswordMatch(password, user.password);

    const token = this.generateAuthToken(user.id);

    return {
      token,
      role: user.role,
    }
  }

  private async checkPasswordMatch(
    givenPassword: string,
    userPassword: string,
  ): Promise<void> {
    const passwordMatch = await bcrypt.compare(givenPassword, userPassword);

    if (!passwordMatch) {
      throw new IncorrectPasswordError();
    }
  }

  public generateAuthToken(
    userId: number,
  ): string {
    return jwt.sign({ userId }, config.JWT_SECRET, {
      expiresIn: `${config.JWT_EXPIRES_IN}h`,
    });
  }
}

export const AutorizationService = new AutorizationServiceImpl();
