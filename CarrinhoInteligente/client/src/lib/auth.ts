import { User, LoginCredentials, RegisterData } from "@shared/schema";
import { apiRequest } from "./queryClient";

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/login", credentials);
  return response.json();
}

export async function registerUser(userData: RegisterData): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/register", userData);
  return response.json();
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem("aurora_user");
  return userData ? JSON.parse(userData) : null;
}

export function setCurrentUser(user: User): void {
  localStorage.setItem("aurora_user", JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem("aurora_user");
}
