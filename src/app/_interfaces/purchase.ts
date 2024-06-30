import { User } from "./user";

export interface Purchase{
  id: number, // Identificador de la compra
  purchase_Date: Date, // Fecha de la compra
  productId: number, // Identificador del producto
  productName: string, // Nombre del producto
  productType: string, // Tipo de producto
  productPrice: number, // Precio del producto
  quantity: number, // Cantidad de productos
  totalPrice: number, // Precio total
  userId: number, // Identificador del usuario
  user: User // Usuario
}
