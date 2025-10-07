import type { User, InsertUser } from "@shared/schema";
import { storage } from "../storage";
import UserModel from "../models/user.model";

// UserRepository is a thin abstraction over the current storage.
// It exposes and consumes UserModel instances so the rest of the
// application can be object-oriented.
export class UserRepository {
  async getById(id: string): Promise<UserModel | undefined> {
    const raw = await storage.getUser(id);
    if (!raw) return undefined;
    return UserModel.fromRaw(raw);
  }

  async getByEmail(email: string): Promise<UserModel | undefined> {
    const raw = await storage.getUserByEmail(email);
    if (!raw) return undefined;
    return UserModel.fromRaw(raw);
  }

  async getByUsername(username: string): Promise<UserModel | undefined> {
    const raw = await storage.getUserByUsername(username);
    if (!raw) return undefined;
    return UserModel.fromRaw(raw);
  }

  async create(user: InsertUser): Promise<UserModel> {
    const raw = await storage.createUser(user);
    return UserModel.fromRaw(raw);
  }
}

export const userRepository = new UserRepository();
