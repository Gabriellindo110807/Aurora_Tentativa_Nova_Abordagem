import type { User, InsertUser } from "@shared/schema";

// Modelo OO para User. Mantém os dados e provê métodos utilitários.
export class UserModel {
  id: string;
  username: string;
  email: string;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  preferredLanguage: string;
  createdAt: Date | null;

  constructor(data: Partial<User> & { id: string }) {
    this.id = data.id;
    this.username = data.username || "";
    this.email = data.email || "";
    this.password = (data as any).password ?? null;
    this.firstName = data.firstName ?? null;
    this.lastName = data.lastName ?? null;
    this.phone = data.phone ?? null;
    this.preferredLanguage = data.preferredLanguage ?? "pt-BR";
    this.createdAt = data.createdAt ?? null;
  }

  static fromRaw(raw: User): UserModel {
    return new UserModel({
      id: raw.id,
      username: raw.username,
      email: raw.email,
      password: (raw as any).password ?? null,
      firstName: raw.firstName ?? null,
      lastName: raw.lastName ?? null,
      phone: raw.phone ?? null,
      preferredLanguage: raw.preferredLanguage ?? "pt-BR",
      createdAt: raw.createdAt ?? null,
    });
  }

  // retorno seguro para exposição em API (remove password)
  toPublic() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      preferredLanguage: this.preferredLanguage,
    };
  }

  // comparador simples de senha (no futuro substituir por hashing)
  checkPassword(plain: string): boolean {
    if (!this.password) return false;
    return this.password === plain;
  }

  // placeholder para setar senha (aqui deveria aplicar hashing)
  setPassword(plain: string) {
    this.password = plain; // TODO: aplicar hashing (bcrypt/argon2)
  }
}

export default UserModel;
