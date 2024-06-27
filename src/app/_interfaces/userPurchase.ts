import { Gender } from "./gender";
import { Role } from "./role";

export interface UserPurchase{
  id: number,
  rut: string,
  name: string,
  birthday: Date,
  email: string,
  password: string,
  isActive: boolean,
  roleId: number,
  role: Role,
  genderId: number,
  gender: Gender
}
