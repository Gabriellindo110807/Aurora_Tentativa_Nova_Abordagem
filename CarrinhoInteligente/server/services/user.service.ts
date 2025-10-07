import { userRepository } from "../repositories/user.repository";
import type { InsertUser, User } from "@shared/schema";

export class UserService {
  async register(userData: InsertUser): Promise<User> {
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

    // NOTE: password hashing should be added here in a later task.
    const user = await userRepository.create(userData);
    return user;
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = await userRepository.getByEmail(email);
    if (!user || user.password !== password) {
      const e: any = new Error("Credenciais inválidas");
      e.status = 401;
      throw e;
    }
    return user;
  }
}

export const userService = new UserService();
