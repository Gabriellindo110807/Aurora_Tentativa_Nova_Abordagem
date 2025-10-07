import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { loginSchema, registerSchema } from "@shared/schema";

export class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await userService.authenticate(email, password);
      res.json({ user: { id: user.id, username: user.username, email: user.email, preferredLanguage: user.preferredLanguage } });
    } catch (err: any) {
      res.status(err.status || 400).json({ message: err.message || "Dados inválidos" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userData = registerSchema.parse(req.body);
      const { confirmPassword, ...toCreate } = userData as any;
      const user = await userService.register(toCreate);
      res.status(201).json({ user: { id: user.id, username: user.username, email: user.email, preferredLanguage: user.preferredLanguage } });
    } catch (err: any) {
      res.status(err.status || 400).json({ message: err.message || "Dados inválidos" });
    }
  }
}

export const userController = new UserController();
