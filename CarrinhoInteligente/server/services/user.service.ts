import { userRepository } from "../repositories/user.repository";
import type { InsertUser } from "@shared/schema";
import UserModel from "../models/user.model";

export class UserService {
  async register(userData: InsertUser): Promise<UserModel> {
    // Basic checks currently present in routes can be moved here.
    const byEmail = await userRepository.getByEmail(userData.email);
    if (byEmail) {
      const e: any = new Error("Email já cadastrado");
      e.status = 409;
      throw e;
    }

    const byUsername = await userRepository.getByUsername(userData.username);
    if (byUsername) {
      const e: any = new Error("Nome de usuário já existe");
      e.status = 409;
      throw e;
    }

    // Create model and set password (placeholder for hashing)
    const created = await userRepository.create(userData);
    // userRepository.create returns a UserModel already
    return created;
  }

  async authenticate(email: string, password: string): Promise<UserModel> {
    const user = await userRepository.getByEmail(email);
    if (!user || !user.checkPassword(password)) {
      const e: any = new Error("Credenciais inválidas");
      e.status = 401;
      throw e;
    }
    return user;
  }
}

export const userService = new UserService();
