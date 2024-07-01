import { User } from "./user";

export interface Auth {
  user: User; // Objeto del usuario
  token: string; // Token de autenticación
}
