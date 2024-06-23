import { User } from "./user";

export interface Purchase{
  id: number,
  purchase_Date: Date,
  productId: number,
  productName: string,
  productType: string,
  productPrice: number,
  quantity: number,
  totalPrice: number,
  userId: number,
  user: User
}
