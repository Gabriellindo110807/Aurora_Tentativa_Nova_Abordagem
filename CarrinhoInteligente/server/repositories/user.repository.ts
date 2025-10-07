import type { User, InsertUser } from "@shared/schema";
import { storage } from "../storage";

// UserRepository is a thin abstraction over the current storage.
// Purpose: centralize persistence access so we can swap storage later.
export class UserRepository {
  async getById(id: string): Promise<User | undefined> {
    return storage.getUser(id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return storage.getUserByEmail(email);
  }

  async getByUsername(username: string): Promise<User | undefined> {
    return storage.getUserByUsername(username);
  }

  async create(user: InsertUser): Promise<User> {
    return storage.createUser(user);
  }
}

export const userRepository = new UserRepository();
