import { Gender } from "./gender";
import { Role } from "./role";

export interface UserPurchase{
  id: number, // Identificador de la compra
  rut: string, // RUT del usuario
  name: string, // Nombre del usuario
  birthday: Date, // Fecha de nacimiento del usuario
  email: string, // Correo electrónico del usuario
  password: string, // Contraseña del usuario
  isActive: boolean, // Estado del usuario
  roleId: number, // Identificador del rol
  role: Role, // Rol del usuario
  genderId: number, // Identificador del género
  gender: Gender // Género del usuario
}
